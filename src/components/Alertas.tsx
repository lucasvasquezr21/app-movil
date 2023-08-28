import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Card, Button } from 'react-native-paper';
import axios from 'axios';
import styles from './styles/alertasStyles.js';

const Alertas = () => {
  const [alertas, setAlertas] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAlertas = async () => {
    try {
      setIsRefreshing(true); 
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZWNpbm9JZCI6IjY0ZWJkNGZiMTgyNzk3ZjM5Nzk3Y2U2MyIsImlhdCI6MTY5MzE3NzA4MywiZXhwIjoxNjkzMTgwMDgzfQ.j211ZiR1KPJbQ_HHHcqIMcT9aFs1bwqQhyRal9aRPvE"; // Reemplaza con tu token de autenticación
      const response = await axios.get('https://fix-api.fly.dev/alertas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAlertas(response.data);
      setIsRefreshing(false); 
    } catch (error) {
      console.error(error);
      setIsRefreshing(false); 
    }
  };

  const handleAlertPress = (alertaId) => {
    console.log(`Ver detalles de la alerta: ${alertaId}`);
    // Aquí puedes implementar la navegación a la vista de detalles de la alerta
  };

  useEffect(() => {
    fetchAlertas();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchAlertas} />}>
      <Text style={styles.title}>Alertas</Text>
      {alertas.map((alerta) => (
        <Card key={alerta._id} style={styles.card}>
          <Card.Content>
            <Text style={styles.alert}>
              {alerta.alert}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => handleAlertPress(alerta._id)}>Ver Alertas</Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

export default Alertas;
