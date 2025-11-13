import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseCard } from '../../components/UI/ExerciseCard';
import { screens } from '../../utils/screens';
import { API_URL } from '../../config/api';

// Ejercicios predefinidos
const predefinedExercises = [
  {
    id: 'sprint-velocidad',
    title: 'Sprint y Velocidad',
    description: 'Entrena tu explosividad y aceleración',
    icon: 'flash',
    color: '#FFD700',
    sets: 3,
    reps: 10,
    category: 'Velocidad',
  },
  {
    id: 'control-pases',
    title: 'Control y Pases',
    description: 'Mejora tu técnica y precisión',
    icon: 'football',
    color: '#00FFC8',
    sets: 4,
    reps: 15,
    category: 'Técnica',
  },
  {
    id: 'resistencia-fisica',
    title: 'Resistencia Física',
    description: 'Sesión de cardio de 20 minutos',
    icon: 'fitness',
    color: '#FF6B6B',
    sets: 1,
    reps: 20,
    duration: 20,
    category: 'Cardio',
  },
  {
    id: 'sentadillas',
    title: 'Sentadillas',
    description: 'Fortalece piernas y glúteos',
    icon: 'barbell',
    color: '#4ECDC4',
    sets: 3,
    reps: 12,
    category: 'Fuerza',
  },
  {
    id: 'flexiones',
    title: 'Flexiones',
    description: 'Desarrolla fuerza en brazos y pecho',
    icon: 'body',
    color: '#FF9F43',
    sets: 3,
    reps: 15,
    category: 'Fuerza',
  },
  {
    id: 'abdominales',
    title: 'Abdominales',
    description: 'Fortalece el core y mejora la estabilidad',
    icon: 'fitness-outline',
    color: '#A55EEA',
    sets: 3,
    reps: 20,
    category: 'Core',
  },
  {
    id: 'saltos-pliometricos',
    title: 'Saltos Pliométricos',
    description: 'Mejora la potencia y agilidad',
    icon: 'arrow-up-circle',
    color: '#26DE81',
    sets: 3,
    reps: 10,
    category: 'Potencia',
  },
  {
    id: 'regates',
    title: 'Regates y Dribling',
    description: 'Perfecciona tu habilidad con el balón',
    icon: 'football-outline',
    color: '#45AAF2',
    sets: 4,
    reps: 12,
    category: 'Técnica',
  },
  {
    id: 'tiros-puerta',
    title: 'Tiros a Puerta',
    description: 'Mejora tu precisión y potencia de tiro',
    icon: 'medal-outline',
    color: '#FD79A8',
    sets: 5,
    reps: 10,
    category: 'Técnica',
  },
  {
    id: 'carrera-continua',
    title: 'Carrera Continua',
    description: 'Aumenta tu resistencia aeróbica',
    icon: 'walk',
    color: '#FDCB6E',
    sets: 1,
    reps: 1,
    duration: 30,
    category: 'Cardio',
  },
  {
    id: 'planchas',
    title: 'Planchas',
    description: 'Fortalece el core y mejora la postura',
    icon: 'resize',
    color: '#6C5CE7',
    sets: 3,
    reps: 1,
    duration: 60, // segundos
    category: 'Core',
  },
  {
    id: 'escaleras',
    title: 'Escaleras de Agilidad',
    description: 'Mejora coordinación y velocidad de pies',
    icon: 'layers',
    color: '#00B894',
    sets: 4,
    reps: 8,
    category: 'Agilidad',
  },
];

export function TrainingDashboardScreen({ route, navigation }) {
  const [token, setToken] = useState(null);
  const [customTrainings, setCustomTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar token
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
        } else {
          const routeToken = route?.params?.token;
          if (routeToken) {
            setToken(routeToken);
          }
        }
      } catch (error) {
        console.error('Error al cargar el token:', error);
        const routeToken = route?.params?.token;
        if (routeToken) {
          setToken(routeToken);
        }
      }
    };

    loadToken();
  }, [route?.params?.token]);

  // Cargar entrenamientos personalizados
  const loadTrainings = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/training`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCustomTrainings(data);
      } else {
        console.error('Error al cargar entrenamientos');
      }
    } catch (error) {
      console.error('Error al cargar entrenamientos:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Refrescar cuando la pantalla recibe foco (cuando vuelves de crear un entrenamiento)
  useFocusEffect(
    useCallback(() => {
      loadTrainings();
    }, [loadTrainings])
  );

  // Eliminar entrenamiento
  const handleDeleteTraining = (trainingId, trainingTitle) => {
    Alert.alert(
      'Eliminar Entrenamiento',
      `¿Estás seguro de que quieres eliminar "${trainingTitle}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/training/${trainingId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              });

              if (response.ok) {
                // Recargar la lista de entrenamientos
                loadTrainings();
                Alert.alert('✅', 'Entrenamiento eliminado correctamente');
              } else {
                const data = await response.json();
                Alert.alert('Error', data.message || 'No se pudo eliminar el entrenamiento');
              }
            } catch (error) {
              console.error('Error al eliminar entrenamiento:', error);
              Alert.alert('Error', 'Error de conexión con el servidor');
            }
          },
        },
      ]
    );
  };

  // Función para obtener color según tipo
  const getTypeColor = (type) => {
    const colors = {
      'Físico': '#FF6B6B',
      'Técnico': '#4ECDC4',
      'Táctico': '#A55EEA',
    };
    return colors[type] || '#00FFC8';
  };

  // Agrupar ejercicios por categoría
  const exercisesByCategory = predefinedExercises.reduce((acc, exercise) => {
    const category = exercise.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(exercise);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header mejorado */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="barbell" size={32} color="#00FFC8" />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Entrenamiento Diario</Text>
            <Text style={styles.subtitle}>Selecciona un ejercicio para comenzar</Text>
          </View>
        </View>
      </View>

      {/* Ejercicios predefinidos por categoría */}
      {Object.entries(exercisesByCategory).map(([category, exercises]) => (
        <View key={category} style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <View style={styles.categoryLine} />
            <Text style={styles.categoryTitle}>{category}</Text>
            <View style={styles.categoryLine} />
          </View>
          {exercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => navigation.navigate(screens.tab.training.exercise, {
                exerciseId: exercise.id,
                exerciseTitle: exercise.title,
                exerciseDescription: exercise.description,
                sets: exercise.sets,
                reps: exercise.reps,
                duration: exercise.duration,
              })}
            >
              <View style={[styles.exerciseIconContainer, { backgroundColor: `${exercise.color}20` }]}>
                <Ionicons name={exercise.icon} size={28} color={exercise.color} />
              </View>
              <View style={styles.exerciseContent}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                <View style={styles.exerciseStats}>
                  {exercise.duration ? (
                    <View style={styles.statBadge}>
                      <Ionicons name="time-outline" size={14} color="#aaa" />
                      <Text style={styles.statText}>{exercise.duration} min</Text>
                    </View>
                  ) : (
                    <>
                      <View style={styles.statBadge}>
                        <Ionicons name="repeat-outline" size={14} color="#aaa" />
                        <Text style={styles.statText}>{exercise.sets} series</Text>
                      </View>
                      <View style={styles.statBadge}>
                        <Ionicons name="fitness-outline" size={14} color="#aaa" />
                        <Text style={styles.statText}>{exercise.reps} reps</Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Entrenamientos personalizados */}
      {customTrainings.length > 0 && (
        <View style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <View style={styles.categoryLine} />
            <Text style={styles.categoryTitle}>Mis Entrenamientos</Text>
            <View style={styles.categoryLine} />
          </View>
          {customTrainings.map((training) => (
            <View key={training._id} style={styles.customTrainingCard}>
              <TouchableOpacity
                style={styles.customTrainingContent}
                onPress={() => navigation.navigate(screens.tab.training.exercise, {
                  exerciseTitle: training.title,
                  exerciseDescription: training.description || '',
                  duration: training.duration,
                  type: training.type,
                })}
              >
                <View style={[styles.exerciseIconContainer, { backgroundColor: '#00FFC820' }]}>
                  <Ionicons name="star" size={24} color="#00FFC8" />
                </View>
                <View style={styles.exerciseContent}>
                  <Text style={styles.exerciseTitle}>{training.title}</Text>
                  <Text style={styles.exerciseDescription}>
                    {training.description || 'Entrenamiento personalizado'}
                  </Text>
                  <View style={styles.exerciseStats}>
                    <View style={styles.statBadge}>
                      <Ionicons name="time-outline" size={14} color="#aaa" />
                      <Text style={styles.statText}>{training.duration} min</Text>
                    </View>
                    <View style={[styles.typeBadge, { backgroundColor: `${getTypeColor(training.type)}20` }]}>
                      <Text style={[styles.typeText, { color: getTypeColor(training.type) }]}>
                        {training.type}
                      </Text>
                    </View>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate(screens.tab.training.custom, { 
                    token, 
                    trainingId: training._id 
                  })}
                >
                  <Ionicons name="create-outline" size={18} color="#00FFC8" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteTraining(training._id, training.title)}
                >
                  <Ionicons name="trash-outline" size={18} color="#ff4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#00FFC8" />
        </View>
      )}

      {/* Botón flotante para crear entrenamiento */}
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate(screens.tab.training.custom, { token })}
        activeOpacity={0.8}
      >
        <Ionicons name="add-circle" size={24} color="#000" />
        <Text style={styles.createButtonText}>Crear Entrenamiento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  header: {
    backgroundColor: '#1C1F26',
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 25,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00FFC820',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    color: '#00FFC8',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
  },
  categorySection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  categoryTitle: {
    color: '#00FFC8',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    letterSpacing: 0.5,
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#00FFC8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exerciseDescription: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 8,
  },
  exerciseStats: {
    flexDirection: 'row',
    gap: 10,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D1117',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statText: {
    color: '#aaa',
    fontSize: 11,
    fontWeight: '500',
  },
  customTrainingCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: '#00FFC8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  customTrainingContent: {
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#2a2f3a',
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#0D1117',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: '#00FFC8',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00FFC8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    gap: 8,
  },
  createButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
