import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ Para guardar el token
import { API_URL } from '../../config/api';

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Guarda el token en AsyncStorage
        await AsyncStorage.setItem('userToken', data.token);

        Alert.alert('✅ Bienvenido', `Hola, ${data.name}`, [
          {
            text: 'OK',
            onPress: () => {
              // HandlerNavigation detectará automáticamente el token
              // y mostrará AppNavigation
            },
          },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/bg-stadium.png')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
      resizeMode="contain"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>SoccerTraining</Text>

        {/* Campo de correo */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Campo de contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Botón de login */}
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Ingresar</Text>
          )}
        </TouchableOpacity>

        {/* Enlace a registro */}
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          <Text style={styles.link}>
            ¿No tienes cuenta? <Text style={{ color: '#00FFC8' }}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    opacity: 0.4,
    resizeMode: 'contain',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00FFC8',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#1C1F26',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00FFC8',
    paddingVertical: 14,
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
  link: {
    color: '#aaa',
    marginTop: 20,
  },
});
