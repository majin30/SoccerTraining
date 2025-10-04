// src/navigations/HandlerNavigation.js

import React from 'react';
import { AuthNavigation } from './stacks/AuthNavigation';
import { AppNavigation } from './AppNavigation';

/**
 * HandlerNavigation:
 * Determina si mostrar el flujo de autenticación (AuthNavigation)
 * o la aplicación principal (AppNavigation)
 */
export function HandlerNavigation() {
  // Puedes reemplazar este valor con una validación real (Firebase, AsyncStorage, etc)
  const userLoggedIn = true; // ← Cambia a false para probar el login

  return userLoggedIn ? <AppNavigation /> : <AuthNavigation />;
}
