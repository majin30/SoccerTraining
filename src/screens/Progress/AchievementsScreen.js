import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config/api';

export function AchievementsScreen({ route }) {
  const [token, setToken] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  // Cargar logros
  const loadAchievements = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/achievements`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAchievements(data.all || []);
      } else {
        console.error('Error al cargar logros');
      }
    } catch (error) {
      console.error('Error al cargar logros:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  // Refrescar cuando la pantalla recibe foco
  useFocusEffect(
    useCallback(() => {
      loadAchievements();
    }, [loadAchievements])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAchievements();
  }, [loadAchievements]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#00FFC8" />
        <Text style={styles.loadingText}>Cargando logros...</Text>
      </View>
    );
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00FFC8" />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Logros</Text>
        <Text style={styles.subtitle}>
          {unlockedCount} de {totalCount} desbloqueados
        </Text>
      </View>

      <View style={styles.achievementsGrid}>
        {achievements.map((achievement, index) => (
          <View
            key={achievement.type || index}
            style={[
              styles.achievementCard,
              !achievement.unlocked && styles.achievementCardLocked,
            ]}
          >
            <Text style={styles.achievementIcon}>
              {achievement.unlocked ? achievement.icon : '🔒'}
            </Text>
            <Text
              style={[
                styles.achievementTitle,
                !achievement.unlocked && styles.achievementTitleLocked,
              ]}
            >
              {achievement.title}
            </Text>
            <Text
              style={[
                styles.achievementDescription,
                !achievement.unlocked && styles.achievementDescriptionLocked,
              ]}
            >
              {achievement.description}
            </Text>
            {achievement.unlocked && achievement.unlockedAt && (
              <Text style={styles.achievementDate}>
                Desbloqueado: {new Date(achievement.unlockedAt).toLocaleDateString('es-ES')}
              </Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  contentContainer: {
    padding: 20,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#aaa',
    marginTop: 10,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#00FFC8',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00FFC8',
  },
  achievementCardLocked: {
    backgroundColor: '#1C1F26',
    borderColor: '#333',
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  achievementTitle: {
    color: '#00FFC8',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  achievementTitleLocked: {
    color: '#666',
  },
  achievementDescription: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  achievementDescriptionLocked: {
    color: '#555',
  },
  achievementDate: {
    color: '#00FFC8',
    fontSize: 10,
    marginTop: 5,
    opacity: 0.7,
  },
});
