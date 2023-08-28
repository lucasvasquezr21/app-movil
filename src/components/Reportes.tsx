import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Image, Button, TextInput } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles/reportesStyles.js';
import { useAuth } from '../../app/context/AuthContext';

const Reportes = () => {
  let url = '';
  const { authState, onLogout } = useAuth();
  const [title, setTitle] = useState('');
  const [usuario, setUsuario] = useState('');
  const [description, setDescription] = useState('');
  const [ubication, setUbication] = useState('');
  const [reportes, setReportes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  useEffect(() => {
    fetchReportes();
  }, []);

  const fetchReportes = async () => {
    try {
      setIsRefreshing(true);

      if (authState.token) {
        const response = await axios.get('https://fix-api.fly.dev/reportes', {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
        setReportes(response.data);
      }

      setIsRefreshing(false);
    } catch (error) {
      console.error(error);
      setIsRefreshing(false);

      if (error.response && error.response.status === 401) {
        // Si el error es de token inválido o no autorizado
        console.log('Token inválido. Reiniciando sesión...');
        await onLogout(); // Cerrar sesión
        // Aquí puedes redirigir al usuario a la página de inicio de sesión
      }
    }
  };

  const handleRefresh = () => {
    fetchReportes();
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  const handleSubmit = async () => {
    if (!imageUri) return;
  
    try {
      const imageFormData = new FormData();
      imageFormData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'report_image.jpg',
      });
  
      const imageResponse = await axios.post('https://api.imgbb.com/1/upload?expiration=600&key=1454d52fe77383c539ffd8e8553e7649', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const imageUrl = imageResponse.data.data.image.url;
      console.log('URL de imagen:', imageUrl);
  
      const token = authState.token;
      if (!token) {
        console.log('Token de sesión no encontrado.');
        return;
      }
  
      const reportData = {
        title,
        usuario,
        description,
        ubication,
        img: imageUrl,
      };
  
      const response = await axios.post('https://fix-api.fly.dev/reportes', reportData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Especifica el tipo de contenido como JSON
        },
      });
  
      console.log('Reporte enviado con éxito:', response.data);
  
      // Limpiar los campos del formulario
      setTitle('');
      setUsuario('');
      setDescription('');
      setUbication('');
  
      // Actualizar la lista de reportes
      fetchReportes();
    } catch (error) {
      console.error('Error al enviar el reporte:', error.response.data);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
    >
      <Text style={styles.title}>Generar Reporte</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={ubication}
        onChangeText={setUbication}
      />
      <View style={styles.buttonContainer}>
        <Button title="Tomar Foto" onPress={handlePickImage} />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        {/* <Button title="Subir Imagen" onPress={handleUploadImage} /> */}
        <Button title="Enviar Reporte" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default Reportes;