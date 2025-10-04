import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export function EditProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <TextInput placeholder="Nombre" style={styles.input} placeholderTextColor="#888" />
      <TextInput placeholder="Posición" style={styles.input} placeholderTextColor="#888" />
      <TextInput placeholder="Edad" keyboardType="numeric" style={styles.input} placeholderTextColor="#888" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>GUARDAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#0D1117' },
  title: { color: '#00FFC8', fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  input: {
    width: '90%',
    backgroundColor: '#1F2937',
    borderRadius: 10,
    color: '#fff',
    padding: 10,
    marginBottom: 15,
  },
  button: { backgroundColor: '#00FFC8', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: '#000', fontWeight: 'bold' },
});
