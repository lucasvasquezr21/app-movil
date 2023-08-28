import React, { useState, useEffect } from 'react';
import { View , Text , ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { Card  } from 'react-native-paper';
import axios from 'axios';
import styles from './styles/homeStyles.js';
import { useAuth } from '../../app/context/AuthContext';

const Home = () => {
  const { authState } = useAuth(); // Obtén el estado de autenticación del contexto
  const [reportes, setReportes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    }
  };

  const handleCategoryPress = () => {
    console.log('Redireccionar a la página de Categorías');
  };

  const handleAlertaPress = () => {
    console.log('Redireccionar a la página de Alertas');
  };

  const onRefresh = () => {
    fetchReportes();
  };

  useEffect(() => {
    fetchReportes();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
      <Text style={styles.title}>CityDat</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={handleCategoryPress}>
          <Text style={styles.cardTitle}>Ver Categorías</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleAlertaPress}>
          <Text style={styles.cardTitle}>Ver Alertas</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Últimos Reportes</Text>
        {reportes.map((reporte) => (
          <Card key={reporte._id} style={styles.card}>
            <Card.Content>
              <Text style={styles.reportTitle}>{reporte.title}</Text>
              <Text style={styles.reportDescription}>Descripción: {reporte.description}</Text>
              <Text style={styles.reportLocation}>Ubicación: {reporte.ubication}</Text>
              <Image source={{ uri: reporte.img }} style={styles.reportImage} />
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;