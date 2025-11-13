import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { API_URL } from '../../config/api';

export function SettingsScreen({ route, navigation }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState(null);

  // Campos editables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [position, setPosition] = useState('');

  // 0️⃣ Cargar token desde AsyncStorage
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
        } else {
          // Si no hay token en AsyncStorage, intenta obtenerlo de route.params
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

  // 1️⃣ Cargar datos del usuario
  useEffect(() => {
    if (!token) return; // Espera a que el token esté disponible

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Verificar el tipo de contenido antes de parsear
        const contentType = response.headers.get('content-type');
        let data;
        
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Respuesta no JSON:', text);
          Alert.alert('Error', 'El servidor respondió con un formato inesperado');
          setLoading(false);
          return;
        } else {
          data = await response.json();
        }
        if (response.ok) {
          setUser(data);
          setName(data.name || '');
          setEmail(data.email || '');
          setAge(String(data.age || ''));
          setWeight(String(data.weight || ''));
          setPosition(data.position || '');
          setImage(data.profileImage || null);
        } else {
          Alert.alert('Error', data.message || 'No se pudieron cargar los datos');
        }
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        if (error.message.includes('JSON')) {
          Alert.alert('Error', 'Error de comunicación con el servidor. Verifica que el servidor esté funcionando.');
        } else {
          Alert.alert('Error', 'No se pudieron cargar los datos del usuario');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // 2️⃣ Seleccionar nueva imagen
  const pickImage = async () => {
    try {
      // Solicitar permisos si es necesario
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permisos necesarios', 'Se necesitan permisos para acceder a la galería');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log('Imagen seleccionada:', imageUri);
        setImage(imageUri);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  // 3️⃣ Cerrar sesión
  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              if (token) {
                try {
                  await fetch(`${API_URL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  });
                } catch (logoutError) {
                  console.warn('No se pudo notificar cierre de sesión:', logoutError);
                }
              }

              // Limpiar el token de AsyncStorage
              await AsyncStorage.removeItem('userToken');
              
              // El HandlerNavigation detectará automáticamente el cambio
              // y mostrará la pantalla de autenticación
              Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente', [
                {
                  text: 'OK',
                  onPress: () => {
                    // Forzar actualización - HandlerNavigation detectará el cambio
                  },
                },
              ]);
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar sesión');
            }
          },
        },
      ]
    );
  };

  // 4️⃣ Guardar cambios
  const handleSave = async () => {
    if (!token) {
      return Alert.alert('Error', 'Usuario no autenticado');
    }

    setSaving(true);

    // Preparar datos para enviar (por ahora solo JSON, sin archivos)
    const updateData = {
      name,
      email,
      age: age ? Number(age) : undefined,
      weight: weight ? Number(weight) : undefined,
      position,
      // Por ahora guardamos la URI de la imagen como string
      // Más adelante podemos implementar subida de archivos con multer
      profileImage: image || undefined,
    };

    console.log('Enviando datos:', { ...updateData, profileImage: image ? 'Imagen presente' : 'Sin imagen' });

    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      // Verificar el tipo de contenido antes de parsear
      const contentType = response.headers.get('content-type');
      let data;
      
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Respuesta no JSON:', text);
        Alert.alert('Error', 'El servidor respondió con un formato inesperado');
        setSaving(false);
        return;
      } else {
        data = await response.json();
      }
      if (response.ok) {
        // Actualizar todos los campos del formulario con los datos actualizados
        setUser(data);
        setName(data.name || '');
        setEmail(data.email || '');
        setAge(String(data.age || ''));
        setWeight(String(data.weight || ''));
        setPosition(data.position || '');
        // Manejar la imagen: mantener la imagen local si el usuario la seleccionó
        // Solo actualizar si el servidor devuelve una URL válida (no local)
        const currentImageIsLocal = image && image.startsWith('file://');
        if (data.profileImage && !data.profileImage.startsWith('file://')) {
          // El servidor devuelve una URL válida, usarla
          setImage(data.profileImage);
        } else if (currentImageIsLocal) {
          // Hay una imagen local seleccionada, mantenerla (no se pierde)
          // No actualizar el estado, mantener la imagen local
        } else {
          // No hay imagen local, usar la del servidor (puede ser null)
          setImage(data.profileImage || null);
        }
        Alert.alert('✅ Perfil actualizado', 'Tus cambios se guardaron correctamente');
      } else {
        Alert.alert('Error', data.message || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      if (error.message.includes('JSON')) {
        Alert.alert('Error', 'Error de comunicación con el servidor. Verifica que el servidor esté funcionando.');
      } else {
        Alert.alert('Error', 'Error de conexión con el servidor');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00FFC8" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>Agregar foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        editable={false} // no editable porque el backend normalmente no cambia email
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        placeholderTextColor="#aaa"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        placeholderTextColor="#aaa"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Posición"
        placeholderTextColor="#aaa"
        value={position}
        onChangeText={setPosition}
      />

      <TouchableOpacity
        style={[styles.button, saving && { opacity: 0.6 }]}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>Guardar cambios</Text>
        )}
      </TouchableOpacity>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0D1117',
  },
  container: {
    backgroundColor: '#0D1117',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#00FFC8',
    marginVertical: 20,
  },
  avatarPlaceholder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#1C1F26',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarText: {
    color: '#888',
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
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ff4444',
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    fontWeight: 'bold',
    color: '#ff4444',
    fontSize: 16,
  },
});
