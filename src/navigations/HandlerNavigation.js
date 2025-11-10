import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppNavigation } from './AppNavigation';
import { AuthNavigation } from './stacks/AuthNavigation';
import { View, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export function HandlerNavigation() {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para cargar el token
  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    } catch (error) {
      console.error('Error al cargar el token:', error);
    } finally {
      setLoading(false);
    }
  };

  // Verifica si hay token guardado en AsyncStorage al montar
  useEffect(() => {
    loadToken();
  }, []);

  // Verificar el token periódicamente para detectar cambios (útil para cerrar sesión)
  useEffect(() => {
    const interval = setInterval(() => {
      loadToken();
    }, 1000); // Verificar cada segundo

    return () => clearInterval(interval);
  }, []);

  // Muestra pantalla de carga mientras revisa el token
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0D1117',
        }}
      >
        <ActivityIndicator size="large" color="#00FFC8" />
      </View>
    );
  }

  // Si hay token → entra a la app, sino → login
  return userToken ? <AppNavigation /> : <AuthNavigation />;
}
