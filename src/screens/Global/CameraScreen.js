import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cámara del dispositivo</Text>
      <Text style={styles.sub}>En esta sección podrás grabar tus entrenamientos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  text: { color: '#00FFC8', fontSize: 22, fontWeight: 'bold' },
  sub: { color: '#aaa', marginTop: 10 },
});
