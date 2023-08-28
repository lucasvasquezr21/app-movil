import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { Card, Button } from 'react-native-paper';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles/reportesStyles.js';

const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchReportes = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.get('https://fix-api.fly.dev/reportes', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZWNpbm9JZCI6IjY0ZWFlY2M5NTA2MzUxYTQ0ZDEwODBiZiIsImlhdCI6MTY5MzExNzY0MSwiZXhwIjoxNjkzMTIwNjQxfQ.q7O6XCyDz0XtPnmLV0869bpRDl1BGhJlTNi3P8Q00ks', // Reemplaza con tu token de acceso
        },
      });
      setReportes(response.data);
      setIsRefreshing(false);
    } catch (error) {
      console.error(error);
      setIsRefreshing(false);
    }
  };

  const handleReportUpload = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();

    if (!pickerResult.canceled) {
      const formData = new FormData();
      formData.append('image', {
        uri: pickerResult.uri
      });

      try {
        const imgbbResponse = await axios.post('https://api.imgbb.com/1/upload?expiration=600&key=1454d52fe77383c539ffd8e8553e7649', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl = imgbbResponse.data.url;

        // Luego de obtener la URL de la imagen, puedes enviarla junto con otros datos a tu API
        const reportData = {
          title: 'Report Title',
          usuario: 'User ID',
          description: 'Report description',
          ubication: 'Report Location',
          img: imageUrl, // Aquí agregas la URL de la imagen
        };

        const response = await axios.post('https://fix-api.fly.dev/reportes', reportData, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZWNpbm9JZCI6IjY0ZWFlY2M5NTA2MzUxYTQ0ZDEwODBiZiIsImlhdCI6MTY5MzExNzY0MSwiZXhwIjoxNjkzMTIwNjQxfQ.q7O6XCyDz0XtPnmLV0869bpRDl1BGhJlTNi3P8Q00ks', // Reemplaza con tu token de acceso
          },
        });

        console.log('Report created:', response.data);
        // Actualiza la lista de reportes
        fetchReportes();
      } catch (error) {
        console.error('Error creating report:', error);
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchReportes} />}>
      <Text style={styles.title}>Reportes</Text>
      <TouchableOpacity onPress={handleReportUpload}>
        <Text>Tomar Foto para Reporte</Text>
      </TouchableOpacity>
      {reportes.map((reporte) => (
        <Card key={reporte._id} style={styles.card}>
          {/* Resto del código para mostrar los reportes */}
        </Card>
      ))}
    </ScrollView>
  );
};

export default Reportes;
