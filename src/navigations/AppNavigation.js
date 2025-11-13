import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigation } from './BottomTabNavigation/BottomTabNavigation';

// 🧩 Pantallas globales o modales
import { UserProfileScreen, CameraScreen, ImageFullScreen } from '../screens/Global';

const Stack = createNativeStackNavigator();

export function AppNavigation({ route, token: propToken }) {
  // 📦 Se prioriza el token recibido como prop (HandlerNavigation), luego route params (por ejemplo desde login)
  const token = propToken ?? route?.params?.token ?? null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Ocultamos la barra superior
      }}
    >
      {/* 🏠 Navegación principal con tabs (Inicio, Progreso, Entrenamiento, etc.) */}
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        initialParams={{ token }}
      />

      {/* 👤 Pantalla de perfil de usuario */}
      <Stack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        initialParams={{ token }}
      />

      {/* 📸 Cámara */}
      <Stack.Screen name="CameraScreen" component={CameraScreen} />

      {/* 🖼️ Imagen completa */}
      <Stack.Screen name="ImageFullScreen" component={ImageFullScreen} />
    </Stack.Navigator>
  );
}
