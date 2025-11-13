import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { API_URL } from '../../config/api';

const METRIC_LABELS = {
  weight: { label: 'Peso', suffix: 'kg' },
  height: { label: 'Altura', suffix: 'cm' },
  speed: { label: 'Velocidad', suffix: 'km/h' },
  endurance: { label: 'Resistencia', suffix: 'min' },
  strength: { label: 'Fuerza', suffix: 'kg' },
  matchesPlayed: { label: 'Partidos', suffix: '' },
  goals: { label: 'Goles', suffix: '' },
  assists: { label: 'Asistencias', suffix: '' },
};

export function ProgressOverviewScreen({ route }) {
  const [token, setToken] = useState(route?.params?.token ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState([]);
  const [creating, setCreating] = useState(false);

  // Mantener sincronizado el token con los params
  useEffect(() => {
    if (route?.params?.token) {
      setToken(route.params.token);
    }
  }, [route?.params?.token]);

  // Intentar cargar token desde AsyncStorage si aún no lo tenemos
  useEffect(() => {
    if (token) return;

    const loadToken = async () => {
      try {
        const stored = await AsyncStorage.getItem('userToken');
        if (stored) {
          setToken(stored);
        }
      } catch (storageError) {
        console.warn('No se pudo leer userToken de AsyncStorage:', storageError);
      }
    };

    loadToken();
  }, [token]);

  const fetchProgress = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const raw = await response.text();
        console.error('Respuesta inesperada al consultar progreso:', raw);
        throw new Error('Respuesta no válida del servidor');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? 'No se pudo obtener el progreso');
      }

      setProgress(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      console.error('Error al obtener progreso:', fetchError);
      setError(fetchError.message || 'No se pudo cargar el progreso');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      if (!token) return;
      fetchProgress();
    }, [token, fetchProgress]),
  );

  const latestProgress = useMemo(() => (progress.length > 0 ? progress[0] : null), [progress]);

  const metrics = useMemo(() => {
    if (!latestProgress) return [];

    return Object.entries(METRIC_LABELS)
      .map(([key, meta]) => {
        const value = latestProgress[key];
        if (value === null || value === undefined || value === '') {
          return null;
        }

        return {
          key,
          label: meta.label,
          value: `${value}${meta.suffix ? ` ${meta.suffix}` : ''}`,
        };
      })
      .filter(Boolean);
  }, [latestProgress]);

  const handleCreateSample = useCallback(async () => {
    if (!token) {
      Alert.alert('Sesión requerida', 'Por favor inicia sesión nuevamente.');
      return;
    }

    setCreating(true);

    try {
      const payload = {
        weight: 75,
        speed: 28,
        endurance: 40,
        strength: 90,
        matchesPlayed: 5,
        goals: 2,
        assists: 1,
        notes: 'Registro de ejemplo generado desde la app',
      };

      const response = await fetch(`${API_URL}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const raw = await response.text();
        console.error('Respuesta inesperada al crear progreso:', raw);
        throw new Error('El servidor respondió con un formato desconocido');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? 'No se pudo crear el registro de progreso');
      }

      Alert.alert('Progreso registrado', 'Se creó un registro de ejemplo.');
      fetchProgress();
    } catch (createError) {
      console.error('Error al crear progreso:', createError);
      Alert.alert('Error', createError.message || 'No se pudo crear el registro.');
    } finally {
      setCreating(false);
    }
  }, [token, fetchProgress]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progreso General</Text>
      {latestProgress && (
        <Text style={styles.date}>
          Última actualización:{' '}
          {new Date(latestProgress.date ?? latestProgress.createdAt ?? Date.now()).toLocaleDateString()}
        </Text>
      )}

      {loading && (
        <View style={styles.feedback}>
          <ActivityIndicator color="#00FFC8" />
          <Text style={styles.feedbackText}>Cargando progreso…</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.feedback}>
          <Text style={styles.feedbackText}>{error}</Text>
        </View>
      )}

      {!loading && !error && metrics.length === 0 && (
        <View style={styles.feedback}>
          <Text style={styles.feedbackText}>Todavía no hay registros de progreso.</Text>
        </View>
      )}

      {!loading && !error && metrics.length > 0 && (
        <FlatList
          data={metrics}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>{item.label}</Text>
              <Text style={styles.metricValue}>{item.value}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        onPress={handleCreateSample}
        style={[styles.createButton, creating && styles.createButtonDisabled]}
        disabled={creating}
      >
        {creating ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.createButtonText}>Crear registro de ejemplo</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    color: '#00FFC8',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  date: {
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 24,
  },
  feedback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackText: {
    color: '#ccc',
    marginTop: 12,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 40,
  },
  metricCard: {
    backgroundColor: '#1C1F26',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  metricLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  metricValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
  },
  createButton: {
    backgroundColor: '#00FFC8',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
