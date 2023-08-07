import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../../app/context/AuthContext';
import Login from '../../app/screens/Login';
import Navigation from './Navigation'; // Importa tu componente Navigation
import styles from '../../src/components/styles/layoutStyles';

const Stack = createNativeStackNavigator();

const Layout = () => {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: styles.container }}>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Main"
            component={Navigation}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
