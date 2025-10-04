import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export function ImageFullScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/bg-stadium.png')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  image: { width: '100%', height: '100%' },
});
