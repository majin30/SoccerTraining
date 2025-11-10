import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Timer = forwardRef(({ onProgress }, ref) => {
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false);
  const onProgressRef = useRef(onProgress);

  // Mantener la referencia del callback actualizada sin causar re-renders
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  // Exponer métodos para controlar el timer desde el componente padre
  useImperativeHandle(ref, () => ({
    stop: () => setActive(false),
    reset: () => {
      setTime(0);
      setActive(false);
      if (onProgressRef.current) {
        onProgressRef.current(0);
      }
    },
    getTime: () => time,
    isActive: () => active,
  }));

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        setTime((t) => {
          const newTime = t + 1;
          // Llamar onProgress de forma segura usando requestAnimationFrame o setTimeout
          setTimeout(() => {
            if (onProgressRef.current) {
              onProgressRef.current((newTime % 60) / 60);
            }
          }, 0);
          return newTime;
        });
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [active]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatTimeDetailed = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTime(0);
    setActive(false);
    if (onProgressRef.current) {
      onProgressRef.current(0);
    }
  };

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <View style={styles.container}>
      {/* Display del tiempo principal */}
      <View style={styles.timeContainer}>
        <View style={[styles.timeCircle, active && styles.timeCircleActive]}>
          <Text style={styles.timeDisplay}>{formatTimeDetailed()}</Text>
          {active && (
            <View style={styles.pulseIndicator}>
              <View style={styles.pulseDot} />
            </View>
          )}
        </View>
      </View>

      {/* Controles */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, styles.primaryButton, active && styles.primaryButtonActive]}
          onPress={handleToggle}
          activeOpacity={0.8}
        >
          <Ionicons
            name={active ? 'pause' : 'play'}
            size={24}
            color="#000"
          />
          <Text style={styles.primaryButtonText}>
            {active ? 'Pausar' : 'Iniciar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.secondaryButton]}
          onPress={handleReset}
          activeOpacity={0.8}
          disabled={time === 0}
        >
          <Ionicons
            name="refresh"
            size={20}
            color={time === 0 ? '#666' : '#00FFC8'}
          />
          <Text style={[styles.secondaryButtonText, time === 0 && styles.secondaryButtonTextDisabled]}>
            Reiniciar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Información adicional */}
      {time > 0 && (
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.statText}>
              {Math.floor(time / 60)} min {time % 60} seg
            </Text>
          </View>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  timeContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  timeCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#1C1F26',
    borderWidth: 4,
    borderColor: '#00FFC8',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#00FFC8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  timeCircleActive: {
    borderColor: '#00FFC8',
    backgroundColor: '#1C1F26',
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  timeDisplay: {
    color: '#00FFC8',
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'monospace',
  },
  pulseIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  pulseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00FFC8',
    shadowColor: '#00FFC8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  controlsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
    minWidth: 140,
  },
  primaryButton: {
    backgroundColor: '#00FFC8',
    shadowColor: '#00FFC8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonActive: {
    backgroundColor: '#FF6B6B',
    shadowColor: '#FF6B6B',
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#1F2937',
    borderWidth: 2,
    borderColor: '#00FFC8',
  },
  secondaryButtonText: {
    color: '#00FFC8',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonTextDisabled: {
    color: '#666',
  },
  statsContainer: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#2a2f3a',
    width: '100%',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
});
