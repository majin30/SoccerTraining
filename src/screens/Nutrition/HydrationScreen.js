import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function HydrationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hidratación Diaria</Text>
      <Text style={styles.subtitle}>Mantente hidratado durante tus entrenamientos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  title: { color: '#00FFC8', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#aaa', marginTop: 10 },
});
