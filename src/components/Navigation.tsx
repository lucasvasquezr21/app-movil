import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
import Home from './Home';
import Categorias from './Categorias';
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
      tabBarShowLabel: false
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
        name="Categorias"
        component={Categorias}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="alert" size={size} color={color} />
          ),
          animationTypeForReplace: getAnimationTypeForReplace(route.name, 'Categorias'),
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
