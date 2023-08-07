import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
import Home from './Home';
import Settings from './Settings';
import styles from './styles/navigationStyles';


const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarInactiveTintColor: '#888',
        tabBarActiveTintColor: '#000',
        tabBarShowLabel: false,
        tabBarIconStyle: styles.tabBarIcon,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          animationTypeForReplace: state => {
            const index = state.index;
            const previousRouteName = state.routes[index - 1]?.name;
            const nextRouteName = state.routes[index]?.name;

            if (
              previousRouteName === 'Settings' &&
              nextRouteName === 'Home'
            ) {
              return 'fade';
            }

            return 'push';
          },
        }}
      />
        <Tab.Screen
        name="Alert"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="alert" size={size} color={color} />
          ),
          animationTypeForReplace: state => {
            const index = state.index;
            const previousRouteName = state.routes[index - 1]?.name;
            const nextRouteName = state.routes[index]?.name;

            if (
              previousRouteName === 'Settings' &&
              nextRouteName === 'Home'
            ) {
              return 'fade';
            }

            return 'push';
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" size={size} color={color} />
          ),
          animationTypeForReplace: state => {
            const index = state.index;
            const previousRouteName = state.routes[index - 1]?.name;
            const nextRouteName = state.routes[index]?.name;

            if (previousRouteName === 'Home' && nextRouteName === 'Settings') {
              return 'fade';
            }

            return 'push';
          },
        }}
      />
    </Tab.Navigator>
  );
};


export default Navigation;