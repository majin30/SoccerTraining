import React from 'react';
import { View, StyleSheet } from 'react-native';

export function ProgressBar({ progress }) {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${progress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: '80%',
    backgroundColor: '#1F2937',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 20,
  },
  bar: {
    height: '100%',
    backgroundColor: '#00FFC8',
  },
});
