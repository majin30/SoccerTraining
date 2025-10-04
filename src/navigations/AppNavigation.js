// src/navigations/AppNavigation.js

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigation } from './BottomTabNavigation/BottomTabNavigation';
import { screens } from '../utils/screens';
import { CameraScreen, UserProfileScreen, ImageFullScreen } from '../screens/Global';

/**
 * AppNavigation:
 * Define la navegación principal de la aplicación una vez autenticado el usuario.
 * Contiene el BottomTabNavigation y pantallas modales globales.
 */
const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <Stack.Navigator>
      {/* Contenedor principal con las pestañas inferiores */}
      <Stack.Screen
        name={screens.tab.root}
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />

      {/* Pantallas globales (modales o externas a las tabs) */}
      <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen
          name={screens.global.userProfileScreen}
          component={UserProfileScreen}
        />
        <Stack.Screen
          name={screens.global.cameraScreen}
          component={CameraScreen}
        />
        <Stack.Screen
          name={screens.global.imageFullScreen}
          component={ImageFullScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
