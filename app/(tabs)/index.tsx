import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const router = useRouter();

  const handlePress = (route: '/(tabs)/explore' | '/(tabs)/notifications' | '/(tabs)/settings') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Trigger haptic feedback
    router.push(route as any); // Navigate to the desired screen
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background.jpeg')} // Background image
      style={styles.background}
      imageStyle={styles.backgroundImage} // To enable tiling
    >
      <View style={styles.container}>
        <Image
          source={require('@/assets/images/Warhammer-logo.png')} // Warhammer logo image
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress('/(tabs)/explore')} // Navigate to "explore"
        >
          <Text style={styles.buttonText}>Character</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress('/(tabs)/settings')} // Navigate to "settings"
        >
          <Text style={styles.buttonText}>Unit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress('/(tabs)/notifications')} // Navigate to "notifications"
        >
          <Text style={styles.buttonText}>Vehicle</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'repeat',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 400, // Adjust as needed for your design
    height: 200, // Adjust as needed for your design
    resizeMode: 'contain',
    position: 'absolute', // Position the image absolutely
    top: 50, // Adjust the distance from the top of the screen
  },
  button: {
    width: '80%',
    backgroundColor: '#001c56', // Dark blue color
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
