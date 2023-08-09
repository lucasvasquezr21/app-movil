import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView ,RefreshControl} from 'react-native';
import { Card } from 'react-native-paper';
import { useAuth } from '../../app/context/AuthContext';
import styles from './styles/settingsStyles.js'


const Settings = () => {
  const { onLogout } = useAuth();

  const handleLogout = async () => {
    await onLogout();
  };

  const onRefresh = () => {
    console.log('Datos actualizados');
  };
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
      <Text style={styles.title}>Configuración</Text>
      <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
    </ScrollView>
  );
};


export default Settings;
