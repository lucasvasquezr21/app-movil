import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Home';
import Reportes from './Reportes';
import Alertas from './Alertas';
import ListarReportes from './listarReportes';
import Settings from './Settings';
import styles from './styles/navigationStyles';

const Tab = createBottomTabNavigator();

const getAnimationTypeForReplace = (previousRoute, nextRoute) => {
  if (previousRoute === 'Settings' && nextRoute === 'Home') {
    return 'fade';
  }
  if (previousRoute === 'Home' && nextRoute === 'Settings') {
    return 'fade';
  }
  return 'push';
};

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          animationTypeForReplace: getAnimationTypeForReplace(route.name, 'Home'),
        })}
      />
      <Tab.Screen
        name="GenerarReportes"
        component={Reportes}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera" size={size} color={color} />
          ),
          animationTypeForReplace: getAnimationTypeForReplace(route.name, 'Reportes'),
        })}
      />
      <Tab.Screen
        name="ListarReportes"
        component={ListarReportes}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="file-document" size={size} color={color} />
          ),
          animationTypeForReplace: getAnimationTypeForReplace(route.name, 'ListarReportes'),
        })}
      />
      <Tab.Screen
        name="Alertas"
        component={Alertas}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="alert" size={size} color={color} />
          ),
          animationTypeForReplace: getAnimationTypeForReplace(route.name, 'Alertas'),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" size={size} color={color} />
          ),
          animationTypeForReplace: getAnimationTypeForReplace(route.name, 'Settings'),
        })}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
