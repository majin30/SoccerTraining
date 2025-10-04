import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export function UserProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/bg-stadium.png')}
        style={styles.avatar}
      />
      <Text style={styles.name}>Jesus Majin</Text>
      <Text style={styles.subtitle}>Defensa | 26 años</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
  avatar: { width: 150, height: 150, borderRadius: 100, marginBottom: 20 },
  name: { color: '#00FFC8', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#aaa', fontSize: 16 },
});
