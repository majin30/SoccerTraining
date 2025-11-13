import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api';

export function CustomTrainingScreen({ route, navigation }) {
  const trainingId = route?.params?.trainingId;
  const isEditing = !!trainingId;
  
  const [token, setToken] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('Físico');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // Cargar token desde AsyncStorage o route params
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

  // Cargar datos del entrenamiento si estamos editando
  useEffect(() => {
    const loadTrainingData = async () => {
      if (!isEditing || !token || !trainingId) return;

      setLoadingData(true);
      try {
        const response = await fetch(`${API_URL}/training/${trainingId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTitle(data.title || '');
          setDescription(data.description || '');
          setDuration(data.duration?.toString() || '');
          setType(data.type || 'Físico');
        } else {
          Alert.alert('Error', 'No se pudo cargar el entrenamiento');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error al cargar entrenamiento:', error);
        Alert.alert('Error', 'Error de conexión con el servidor');
        navigation.goBack();
      } finally {
        setLoadingData(false);
      }
    };

    loadTrainingData();
  }, [isEditing, token, trainingId]);

  const handleSaveTraining = async () => {
    if (!title || !duration) {
      return Alert.alert('Error', 'Por favor completa todos los campos requeridos.');
    }

    setLoading(true);

    try {
      const url = isEditing ? `${API_URL}/training/${trainingId}` : `${API_URL}/training`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          duration: Number(duration),
          type,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          `✅ Entrenamiento ${isEditing ? 'actualizado' : 'creado'}`,
          `Tu rutina personalizada se ha ${isEditing ? 'actualizado' : 'guardado'}.`
        );
        setTitle('');
        setDescription('');
        setDuration('');
        setType('Físico');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || `No se pudo ${isEditing ? 'actualizar' : 'crear'} el entrenamiento`);
      }
    } catch (error) {
      console.error(`Error al ${isEditing ? 'actualizar' : 'crear'} entrenamiento:`, error);
      Alert.alert('Error', 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#00FFC8" />
        <Text style={{ color: '#aaa', marginTop: 10 }}>Cargando entrenamiento...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {isEditing ? 'Editar Entrenamiento' : 'Crear Entrenamiento Personalizado'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Título del entrenamiento"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Descripción (opcional)"
        placeholderTextColor="#aaa"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Duración (minutos)"
        placeholderTextColor="#aaa"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <View style={styles.typeContainer}>
        {['Físico', 'Técnico', 'Táctico'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.typeButton,
              type === option && { backgroundColor: '#00FFC8' },
            ]}
            onPress={() => setType(option)}
          >
            <Text
              style={[
                styles.typeText,
                type === option && { color: '#000', fontWeight: 'bold' },
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSaveTraining}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>
            {isEditing ? 'Actualizar Entrenamiento' : 'Guardar Entrenamiento'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D1117',
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: '#00FFC8',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1C1F26',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 15,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    backgroundColor: '#1C1F26',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  typeText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#00FFC8',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
