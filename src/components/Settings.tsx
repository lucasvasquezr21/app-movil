import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../app/context/AuthContext';

const Settings = () => {
  const { onLogout } = useAuth();

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cerrar sesión</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Settings;
