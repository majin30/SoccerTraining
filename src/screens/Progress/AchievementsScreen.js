import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function AchievementsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logros Desbloqueados</Text>
      <Text style={styles.subtitle}>¡Sigue entrenando para obtener más!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  title: { color: '#00FFC8', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#aaa', marginTop: 10 },
});
