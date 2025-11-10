import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Timer } from '../../components/UI/Timer';
import { ProgressBar } from '../../components/UI/ProgressBar';

export function ExerciseDetailScreen({ route, navigation }) {
  const [progress, setProgress] = useState(0.0);
  const timerRef = useRef(null);

  // Usar useCallback para mantener una referencia estable del callback
  const handleProgress = useCallback((p) => {
    setProgress(p);
  }, []);
  
  // Obtener datos del ejercicio desde los parámetros de navegación
  const exerciseTitle = route?.params?.exerciseTitle || 'Ejercicio';
  const exerciseDescription = route?.params?.exerciseDescription || '';
  const sets = route?.params?.sets;
  const reps = route?.params?.reps;
  const duration = route?.params?.duration; // en minutos, opcional
  const type = route?.params?.type; // tipo de entrenamiento (Físico, Técnico, Táctico)

  // Formatear la descripción del ejercicio
  const getExerciseSubtitle = () => {
    if (duration) {
      return `${duration} minutos${type ? ` • ${type}` : ''}`;
    }
    if (sets && reps) {
      return `${sets} series de ${reps} repeticiones`;
    }
    return 'Ejercicio personalizado';
  };

  const handleFinish = () => {
    // Detener el timer si está activo
    if (timerRef.current && timerRef.current.isActive()) {
      timerRef.current.stop();
    }

    Alert.alert(
      '✅ Ejercicio Finalizado',
      `Has completado: ${exerciseTitle}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Navegar de vuelta a la pantalla anterior
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exerciseTitle}</Text>
      {exerciseDescription ? (
        <Text style={styles.description}>{exerciseDescription}</Text>
      ) : null}
      <Text style={styles.subtitle}>{getExerciseSubtitle()}</Text>

      <ProgressBar progress={progress} />

      <Timer ref={timerRef} onProgress={handleProgress} />

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>FINALIZAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0D1117', padding: 20 },
  title: { color: '#00FFC8', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { color: '#aaa', fontSize: 16, marginBottom: 10, textAlign: 'center' },
  subtitle: { color: '#aaa', marginBottom: 20, fontSize: 14 },
  button: {
    backgroundColor: '#00FFC8',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    minWidth: 150,
    alignItems: 'center',
  },
  buttonText: { color: '#000', fontWeight: 'bold' },
});
