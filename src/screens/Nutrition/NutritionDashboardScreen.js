import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function NutritionDashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan Nutricional</Text>
      <Text style={styles.subtitle}>Alimentación recomendada según tu entrenamiento</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  title: { color: '#00FFC8', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#aaa' },
});
