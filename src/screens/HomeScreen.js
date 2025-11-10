import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { screens } from '../utils/screens';

export function HomeScreen({ navigation }) {
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header mejorado */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="football" size={32} color="#00FFC8" />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>{getCurrentGreeting()}</Text>
            <Text style={styles.title}>SoccerTraining</Text>
          </View>
        </View>
      </View>

      {/* Estadísticas mejoradas */}
      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={[styles.statCard, styles.statCardPrimary]}
          onPress={() => navigation.navigate('Progress', {
            screen: screens.tab.progress.history,
          })}
          activeOpacity={0.8}
        >
          <View style={styles.statIconContainer}>
            <Ionicons name="flame" size={32} color="#FF6B6B" />
          </View>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Días consecutivos</Text>
          <View style={styles.statBadge}>
            <Ionicons name="trending-up" size={12} color="#00FFC8" />
            <Text style={styles.statBadgeText}>Racha activa</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statCard, styles.statCardSecondary]}
          onPress={() => navigation.navigate('Progress', {
            screen: screens.tab.progress.achievements,
          })}
          activeOpacity={0.8}
        >
          <View style={styles.statIconContainer}>
            <Ionicons name="trophy" size={32} color="#FFD700" />
          </View>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Logros</Text>
          <View style={styles.statBadge}>
            <Ionicons name="star" size={12} color="#00FFC8" />
            <Text style={styles.statBadgeText}>Desbloqueados</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Accesos rápidos mejorados */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Accesos Rápidos</Text>
          <View style={styles.sectionLine} />
        </View>
        
        <TouchableOpacity
          style={[styles.quickAction, styles.quickActionPrimary]}
          onPress={() => navigation.navigate('Training')}
          activeOpacity={0.8}
        >
          <View style={styles.quickActionIconContainer}>
            <Ionicons name="barbell" size={28} color="#00FFC8" />
          </View>
          <View style={styles.quickActionContent}>
            <Text style={styles.quickActionTitle}>Iniciar Entrenamiento</Text>
            <Text style={styles.quickActionSubtitle}>Comienza tu rutina diaria</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#00FFC8" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickAction, styles.quickActionSecondary]}
          onPress={() => navigation.navigate('Progress')}
          activeOpacity={0.8}
        >
          <View style={styles.quickActionIconContainer}>
            <Ionicons name="stats-chart" size={28} color="#4ECDC4" />
          </View>
          <View style={styles.quickActionContent}>
            <Text style={styles.quickActionTitle}>Ver Progreso</Text>
            <Text style={styles.quickActionSubtitle}>Revisa tus estadísticas</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#4ECDC4" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickAction, styles.quickActionTertiary]}
          onPress={() => navigation.navigate('UserProfileScreen')}
          activeOpacity={0.8}
        >
          <View style={styles.quickActionIconContainer}>
            <Ionicons name="person" size={28} color="#A55EEA" />
          </View>
          <View style={styles.quickActionContent}>
            <Text style={styles.quickActionTitle}>Mi Perfil</Text>
            <Text style={styles.quickActionSubtitle}>Gestiona tu cuenta</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#A55EEA" />
        </TouchableOpacity>
      </View>

      {/* Sección de motivación */}
      <View style={styles.motivationSection}>
        <View style={styles.motivationCard}>
          <Ionicons name="bulb" size={24} color="#00FFC8" />
          <Text style={styles.motivationText}>
            "La disciplina es el puente entre tus metas y tus logros"
          </Text>
        </View>
      </View>
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
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
  greeting: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  title: {
    color: '#00FFC8',
    fontSize: 32,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statCardPrimary: {
    borderLeftColor: '#FF6B6B',
  },
  statCardSecondary: {
    borderLeftColor: '#FFD700',
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0D1117',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D1117',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    marginTop: 4,
  },
  statBadgeText: {
    color: '#00FFC8',
    fontSize: 10,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#00FFC8',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 15,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionPrimary: {
    borderLeftColor: '#00FFC8',
  },
  quickActionSecondary: {
    borderLeftColor: '#4ECDC4',
  },
  quickActionTertiary: {
    borderLeftColor: '#A55EEA',
  },
  quickActionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0D1117',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    color: '#888',
    fontSize: 13,
  },
  motivationSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  motivationCard: {
    flexDirection: 'row',
    backgroundColor: '#1C1F26',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00FFC830',
    gap: 15,
  },
  motivationText: {
    flex: 1,
    color: '#aaa',
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

