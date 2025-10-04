import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function SupplementsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suplementos Recomendados</Text>
      <Text style={styles.subtitle}>Apoya tu rendimiento con una buena suplementación</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  title: { color: '#00FFC8', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#aaa', marginTop: 10 },
});
