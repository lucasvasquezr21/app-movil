import React from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import styles from './styles/homeStyles.js';

const Home = () => {
  const handleCategoryPress = () => {
    console.log('Redireccionar a la página de alertas');
  };

  const handleMaestroPress = () => {
    console.log('Redireccionar a la página de tareas');
  };

  const onRefresh = () => {
    console.log('Datos actualizados');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
    >
      <Text style={styles.title}>CityDat</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={handleCategoryPress}>
          <Text style={styles.cardTitle}>Ver Alertas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleMaestroPress}>
          <Text style={styles.cardTitle}>Ver Tareas</Text>
        </TouchableOpacity>
        <Text style={styles.title}>¡Importante!</Text>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Alerta 1</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

export default Home;
