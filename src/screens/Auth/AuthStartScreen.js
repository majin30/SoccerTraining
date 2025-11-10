import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';

export function AuthStartScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../../assets/images/bg-stadium.png')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
      resizeMode="contain"
    >
      <LottieView
        source={require('../../../assets/animations/logo.json')}
        autoPlay
        loop={false}
        style={styles.logo}
      />

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.startText}>INICIAR</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  backgroundImage: {
    opacity: 0.4,
    resizeMode: 'contain',
  },
  logo: {
    width: 250,
    height: 250,
  },
  startButton: {
    marginTop: 40,
    backgroundColor: '#00FFC8',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  startText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
