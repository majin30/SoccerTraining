import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api';

export function UserProfileScreen({ route, navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

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
      }
    };

    loadToken();
  }, [route?.params?.token]);

  // Función para cargar datos del usuario
  const fetchUser = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Respuesta no JSON:', text);
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        Alert.alert('Error', data.message || 'No se pudieron cargar los datos');
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      Alert.alert('Error', 'No se pudieron cargar los datos del usuario');
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Cargar datos cuando la pantalla recibe foco (se actualiza al volver de Settings)
  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [fetchUser])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00FFC8" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Ionicons name="person-circle-outline" size={80} color="#666" />
        <Text style={styles.errorText}>No se pudieron cargar los datos</Text>
      </View>
    );
  }

  const subtitleParts = [];
  if (user.position) subtitleParts.push(user.position);
  if (user.age) subtitleParts.push(`${user.age} años`);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header con gradiente visual */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {user.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={60} color="#00FFC8" />
            </View>
          )}
          <View style={styles.avatarBadge}>
            <Ionicons name="checkmark-circle" size={24} color="#00FFC8" />
          </View>
        </View>
        <Text style={styles.name}>{user.name || 'Usuario'}</Text>
        {subtitleParts.length > 0 && (
          <Text style={styles.subtitle}>{subtitleParts.join(' • ')}</Text>
        )}
        {user.email && (
          <View style={styles.emailContainer}>
            <Ionicons name="mail-outline" size={16} color="#aaa" />
            <Text style={styles.email}>{user.email}</Text>
          </View>
        )}
      </View>

      {/* Tarjetas de información */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        
        {user.position && (
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="football" size={24} color="#00FFC8" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Posición</Text>
              <Text style={styles.infoValue}>{user.position}</Text>
            </View>
          </View>
        )}

        {user.age && (
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="calendar-outline" size={24} color="#00FFC8" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Edad</Text>
              <Text style={styles.infoValue}>{user.age} años</Text>
            </View>
          </View>
        )}

        {user.weight && (
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="barbell-outline" size={24} color="#00FFC8" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Peso</Text>
              <Text style={styles.infoValue}>{user.weight} kg</Text>
            </View>
          </View>
        )}
      </View>

      {/* Botón de editar perfil */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          // Navegar al tab de Settings a través del BottomTabNavigation
          navigation?.navigate('BottomTabNavigation', {
            screen: 'Settings',
          });
        }}
      >
        <Ionicons name="create-outline" size={20} color="#000" />
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>
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
  loadingText: {
    color: '#aaa',
    marginTop: 10,
    fontSize: 14,
  },
  errorText: {
    color: '#aaa',
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    backgroundColor: '#1C1F26',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#00FFC8',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0D1117',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#00FFC8',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#0D1117',
    borderRadius: 15,
    padding: 2,
  },
  name: {
    color: '#00FFC8',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  email: {
    color: '#888',
    fontSize: 14,
    marginLeft: 5,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#00FFC8',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#00FFC8',
  },
  infoIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0D1117',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#00FFC8',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: '#00FFC8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  editButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
