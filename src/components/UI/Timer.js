import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function Timer({ onProgress }) {
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
        onProgress && onProgress((time % 60) / 60);
      }, 1000);
    } else if (!active && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active, time]);

  const formatTime = () => `${Math.floor(time / 60)}:${('0' + (time % 60)).slice(-2)}`;

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime()}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setActive(!active)}>
        <Text style={styles.buttonText}>{active ? 'Pausar' : 'Iniciar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.reset} onPress={() => setTime(0)}>
        <Text style={styles.resetText}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  time: { color: '#00FFC8', fontSize: 36, fontWeight: 'bold', marginBottom: 10 },
  button: { backgroundColor: '#00FFC8', padding: 10, borderRadius: 8, width: 100, alignItems: 'center' },
  buttonText: { color: '#000', fontWeight: 'bold' },
  reset: { marginTop: 10 },
  resetText: { color: '#aaa', fontSize: 14 },
});
