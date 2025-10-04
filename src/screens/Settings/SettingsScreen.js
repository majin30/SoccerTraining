import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.link}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Text style={styles.link}>Notificaciones</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  title: { color: '#00FFC8', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  link: { color: '#00FFC8', fontSize: 18, marginVertical: 10 },
});
