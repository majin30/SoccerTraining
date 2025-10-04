import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function ProgressOverviewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progreso General</Text>
      <Text style={styles.subtitle}>Fuerza, velocidad y resistencia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  title: { color: '#00FFC8', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#aaa' },
});
