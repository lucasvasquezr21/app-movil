import React, { useEffect, useState } from 'react';
import {  Image, Text, ScrollView, RefreshControl } from 'react-native';
import { useAuth } from '../../app/context/AuthContext';
import { Button, Card } from 'react-native-paper';
import axios from 'axios';
import styles from './styles/reportesStyles.js';

const ListarReportes = () => {
  const { authState, onLogout } = useAuth();
  const [reportes, setReportes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchReportes = async () => {
    try {
      setIsRefreshing(true);

      if (authState.token) {
        console.log(authState.token)
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
        console.log('Token inválido. Reiniciando sesión...');
        await onLogout();
      }
    }
  };

  const handleReportPress = (reporteId) => {
    console.log(`Ver detalles del reporte: ${reporteId}`);
    // Aquí puedes implementar la navegación a la vista de detalles de la alerta
  };

  useEffect(() => {
    fetchReportes();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchReportes} />}>
      <Text style={styles.title}>Últimos Reportes</Text>
      {reportes.map((reporte) => (
        <Card key={reporte._id} style={styles.card}>
          <Card.Content>
            <Text style={styles.reportTitle}>{reporte.title}</Text>
            <Text style={styles.reportDescription}>Descripción: {reporte.description}</Text>
            <Text style={styles.reportLocation}>Ubicación: {reporte.ubication}</Text>
            <Image source={{ uri: reporte.img }} style={styles.reportImage} />
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => handleReportPress(reporte._id)}>Ver Reporte</Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

export default ListarReportes;
