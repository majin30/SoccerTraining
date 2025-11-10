import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// 🏠 Tus pantallas principales
import { HomeScreen } from '../../screens/HomeScreen';
import { TrainingNavigation } from '../stacks/TrainingNavigation';
import { ProgressNavigation } from '../stacks/ProgressNavigation';
import { SettingsScreen } from '../../screens/Settings/SettingsScreen';

const Tab = createBottomTabNavigator();

export function BottomTabNavigation({ route }) {
  const token = route?.params?.token || null;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0D1117', borderTopColor: '#00FFC8' },
        tabBarActiveTintColor: '#00FFC8',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Training') iconName = 'barbell';
          else if (route.name === 'Progress') iconName = 'stats-chart';
          else if (route.name === 'Settings') iconName = 'settings';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{ token }} />
      <Tab.Screen name="Training" component={TrainingNavigation} initialParams={{ token }} />
      <Tab.Screen name="Progress" component={ProgressNavigation} initialParams={{ token }} />
      <Tab.Screen name="Settings" component={SettingsScreen} initialParams={{ token }} />
    </Tab.Navigator>
  );
}
