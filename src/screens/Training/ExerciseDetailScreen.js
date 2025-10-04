import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Timer } from '../../components/UI/Timer';
import { ProgressBar } from '../../components/UI/ProgressBar';

export function ExerciseDetailScreen() {
  const [progress, setProgress] = useState(0.0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sprint y Velocidad</Text>
      <Text style={styles.subtitle}>3 series de 10 repeticiones</Text>

      <ProgressBar progress={progress} />

      <Timer onProgress={(p) => setProgress(p)} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>FINALIZAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0D1117' },
  title: { color: '#00FFC8', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#aaa', marginBottom: 20 },
  button: {
    backgroundColor: '#00FFC8',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: { color: '#000', fontWeight: 'bold' },
});
