import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStartScreen, LoginScreen, RegisterScreen } from '../../screens/Auth';

const Stack = createNativeStackNavigator();

export function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // 🔹 oculta los encabezados
      }}
      initialRouteName="AuthStartScreen"
    >
      {/* Pantalla de inicio de autenticación */}
      <Stack.Screen name="AuthStartScreen" component={AuthStartScreen} />

      {/* Pantalla de Login */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      {/* Pantalla de Registro */}
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
