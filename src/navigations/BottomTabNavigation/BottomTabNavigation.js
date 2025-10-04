// src/navigations/BottomTabNavigation/BottomTabNavigation.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { screens } from '../../utils/screens';

// Importamos las pilas de cada módulo principal
import { TrainingNavigation } from '../stacks/TrainingNavigation';
import { ProgressNavigation } from '../stacks/ProgressNavigation';
import { NutritionNavigation } from '../stacks/NutritionNavigation';
import { SettingsNavigation } from '../stacks/SettingsNavigation';

// Creamos el Tab Navigator
const Tab = createBottomTabNavigator();

/**
 * BottomTabNavigation:
 * Navegación inferior principal de la app (Entrenar, Progreso, Nutrición, Ajustes)
 */
export function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0D1117',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#00FFC8',
        tabBarInactiveTintColor: '#646464',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Iconos personalizados por cada tab
          switch (route.name) {
            case screens.tab.training.root:
              iconName = 'soccer';
              break;
            case screens.tab.progress.root:
              iconName = 'chart-line';
              break;
            case screens.tab.nutrition.root:
              iconName = 'food-apple';
              break;
            case screens.tab.settings.root:
              iconName = 'cog-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
      })}
    >
      {/* Pestaña Entrenar */}
      <Tab.Screen
        name={screens.tab.training.root}
        component={TrainingNavigation}
        options={{ title: 'Entrenar' }}
      />

      {/* Pestaña Progreso */}
      <Tab.Screen
        name={screens.tab.progress.root}
        component={ProgressNavigation}
        options={{ title: 'Progreso' }}
      />

      {/* Pestaña Nutrición */}
      <Tab.Screen
        name={screens.tab.nutrition.root}
        component={NutritionNavigation}
        options={{ title: 'Nutrición' }}
      />

      {/* Pestaña Ajustes */}
      <Tab.Screen
        name={screens.tab.settings.root}
        component={SettingsNavigation}
        options={{ title: 'Ajustes' }}
      />
    </Tab.Navigator>
  );
}
