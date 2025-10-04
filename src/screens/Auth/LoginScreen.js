import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a SoccerTraining</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  title: { color: '#00FFC8', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#aaa', marginTop: 10 },
  link: { color: '#00FFC8', marginTop: 20, textDecorationLine: 'underline' },
});
