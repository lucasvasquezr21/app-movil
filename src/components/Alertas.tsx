import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useAuth } from '../../app/context/AuthContext';
import { Card, Button } from 'react-native-paper';
import axios from 'axios';
import styles from './styles/alertasStyles.js';

const Alertas = () => {
  const { authState, onLogout } = useAuth();
  const [alertas, setAlertas] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  console.log(authState);

  const fetchAlertas = async () => {
    try {
      setIsRefreshing(true);
      if (authState.token) {
        const response = await axios.get('https://fix-api.fly.dev/alertas', {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
        setAlertas(response.data);
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
      <Text style={styles.userInfo}>
        ID: {authState.user ? authState.user.id : 'N/A'}
        {' | '}
        Email: {authState.user ? authState.user.email : 'N/A'}
        {' | '}
        Comuna: {authState.user ? authState.user.comuna : 'N/A'}
      </Text>
      {alertas.map((alerta) => (
        <Card key={alerta._id} style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>{alerta.title}</Text>
            <Text style={styles.description}>Descripción: {alerta.description}</Text>
            <Text style={styles.ubication}>Ubicación: {alerta.ubication}</Text>
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
