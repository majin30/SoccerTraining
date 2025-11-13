import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../config/api';

export function HistoryScreen({ route }) {
  const [token, setToken] = useState(null);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTrainings(sorted);
      } else {
        console.error('Error al cargar el historial de entrenamientos');
      }
    } catch (error) {
      console.error('Error al cargar historial:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      loadTrainings();
    }, [loadTrainings])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTrainings();
  }, [loadTrainings]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      'Físico': '#FF6B6B',
      'Técnico': '#4ECDC4',
      'Táctico': '#A55EEA',
    };
    return colors[type] || '#00FFC8';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FFC8" />
        <Text style={styles.loadingText}>Cargando historial...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00FFC8" />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Historial de Entrenamientos</Text>
        <Text style={styles.subtitle}>Consulta tus rutinas recientes y personalizadas</Text>
      </View>

      {trainings.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={48} color="#444" />
          <Text style={styles.emptyTitle}>Aún no tienes entrenamientos</Text>
          <Text style={styles.emptySubtitle}>
            Comienza tu primera rutina para ver tu historial aquí.
          </Text>
        </View>
      ) : (
        trainings.map((training) => (
          <View key={training._id} style={styles.trainingCard}>
            <View style={styles.trainingHeader}>
              <View style={[styles.iconContainer, { backgroundColor: `${getTypeColor(training.type)}20` }]}>
                <Ionicons name="time-outline" size={20} color={getTypeColor(training.type)} />
              </View>
              <View style={styles.trainingInfo}>
                <Text style={styles.trainingTitle}>{training.title}</Text>
                <Text style={styles.trainingDescription}>
                  {training.description || 'Entrenamiento sin descripción.'}
                </Text>
              </View>
            </View>

            <View style={styles.trainingMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="calendar" size={16} color="#888" />
                <Text style={styles.metaText}>{formatDate(training.createdAt)}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time" size={16} color="#888" />
                <Text style={styles.metaText}>{formatTime(training.createdAt)}</Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: `${getTypeColor(training.type)}20` }]}>
                <Text style={[styles.typeText, { color: getTypeColor(training.type) }]}>{training.type}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.trainingStats}>
              <View style={styles.statItem}>
                <Ionicons name="stopwatch" size={16} color="#00FFC8" />
                <Text style={styles.statText}>{training.duration} min</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="barbell" size={16} color="#00FFC8" />
                <Text style={styles.statText}>Rutina personalizada</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D1117',
  },
  loadingText: {
    color: '#aaa',
    marginTop: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    color: '#00FFC8',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
  trainingCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 18,
    padding: 18,
    borderLeftWidth: 4,
    borderLeftColor: '#00FFC8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  trainingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  trainingInfo: {
    flex: 1,
  },
  trainingTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  trainingDescription: {
    color: '#aaa',
    fontSize: 13,
    lineHeight: 18,
  },
  trainingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
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
  divider: {
    height: 1,
    backgroundColor: '#2a2f3a',
    marginVertical: 10,
  },
  trainingStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: '#00FFC8',
    fontSize: 12,
    fontWeight: '600',
  },
});
