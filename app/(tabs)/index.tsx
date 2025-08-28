import React, { useEffect } from 'react';
import { 
  View, 
  Alert, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Platform, 
  Text 
} from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/constants/Api';

export default function LoginScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        router.replace('/(tabs)');
      }
    };

    checkLogin();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const authUrl = `${API_URL}/auth/google`;
      const redirectUrl = AuthSession.makeRedirectUri();

      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);

      if (result.type === 'success' && result.url) {
        const params = new URL(result.url).searchParams;
        const user = params.get('user');
        if (user) {
          await AsyncStorage.setItem('userId', user);
          router.replace('/(tabs)/profile');
        }
      } else {
        Alert.alert('Authentication canceled or failed');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to authenticate with Google');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image 
          source={require('@/assets/images/google-icon.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        <Text style={styles.welcomeText}>Account?</Text>
        <TouchableOpacity 
          style={styles.googleButton} 
          onPress={handleGoogleLogin}
        >
          <Image 
            source={require('@/assets/images/google-g.png')} 
            style={styles.googleIcon} 
          />
          <Text style={styles.googleButtonText}>Sign or Login in with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
    position: 'absolute', // Position the image absolutely
    top: 50, // Adjust the distance from the top of the screen
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
