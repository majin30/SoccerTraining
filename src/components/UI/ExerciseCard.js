import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export function ExerciseCard({ title, description, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F2937',
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
  },
  title: { color: '#00FFC8', fontSize: 18, fontWeight: 'bold' },
  desc: { color: '#aaa', fontSize: 14, marginTop: 5 },
});
