import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>Regístrate y comienza a entrenar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  title: { color: '#00FFC8', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#aaa', marginTop: 8 },
});
