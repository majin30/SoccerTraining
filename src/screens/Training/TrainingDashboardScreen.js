import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ExerciseCard } from '../../components/UI/ExerciseCard';

export function TrainingDashboardScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Entrenamiento Diario</Text>
      <Text style={styles.subtitle}>Selecciona un ejercicio para comenzar</Text>

      <ExerciseCard
        title="Sprint y Velocidad"
        description="Entrena tu explosividad y aceleración"
        onPress={() => navigation.navigate('ExerciseDetail')}
      />
      <ExerciseCard
        title="Control y Pases"
        description="Mejora tu técnica y precisión"
        onPress={() => navigation.navigate('ExerciseDetail')}
      />
      <ExerciseCard
        title="Resistencia Física"
        description="Sesión de cardio de 20 minutos"
        onPress={() => navigation.navigate('ExerciseDetail')}
      />

      <TouchableOpacity
        style={styles.customButton}
        onPress={() => navigation.navigate('CustomTraining')}
      >
        <Text style={styles.customButtonText}>CREAR ENTRENAMIENTO PERSONALIZADO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', padding: 20 },
  title: { color: '#00FFC8', fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { color: '#aaa', fontSize: 14, marginBottom: 20 },
  customButton: {
    backgroundColor: '#00FFC8',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  customButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
