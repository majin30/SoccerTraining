import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function CustomTrainingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrenamiento Personalizado</Text>
      <Text style={styles.subtitle}>Crea tu propia rutina de ejercicios</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>GUARDAR RUTINA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  title: { color: '#00FFC8', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#aaa', marginVertical: 20 },
  button: { backgroundColor: '#00FFC8', padding: 15, borderRadius: 10 },
  buttonText: { color: '#000', fontWeight: 'bold' },
});
