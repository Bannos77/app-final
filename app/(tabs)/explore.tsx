import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

const CharacterCard = ({ name, image, route }: { name: string; image: string; route: string }) => {
  const router = useRouter();

  const images: any = {
    'fabius-bile': require('@/assets/images/fabius-bile.jpg'),
    'abaddon': require('@/assets/images/abaddon.jpg'),
    'typhus': require('@/assets/images/typhus.jpg'),
    'daemon-prince': require('@/assets/images/daemon-prince.jpg'),
    'tigurius': require('@/assets/images/tigurius.jpg'),
    'roboute-guilliman': require('@/assets/images/roboute-guilliman.jpg'),
    'marneus-calgar': require('@/assets/images/marneus-calgar.jpg'),
    'uriel-ventris': require('@/assets/images/uriel-ventris.jpg'),
    'placeholder': require('@/assets/images/placeholder.png'),
  };

  const imageSource = images[image] ? images[image] : { uri: image };

  const handlePress = async () => {
    await Haptics.selectionAsync();
    if (route) {
      router.push(route as any);
    } else {
      console.warn('No route specified for this card');
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={imageSource} style={styles.characterImage} />
      <Text style={styles.characterName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default function CharacterScreen() {
  return (
    <ImageBackground
      source={require('@/assets/images/background.jpeg')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Characters</Text>
        </View>

        {/* Chaos Section */}
        <View style={styles.sectionTitleContainer}>
        <View style={[styles.sectionTitleBackground, styles.chaosBackground]} />
        <Text style={styles.sectionTitleText}>CHAOS</Text>
        </View>

        <View style={styles.characterRow}>
          <CharacterCard name="Fabius Bile" image="fabius-bile" route="/characters/fabius-bile" />
          <CharacterCard name="Abaddon" image="abaddon" route="/characters/abaddon" />
        </View>
        <View style={styles.characterRow}>
          <CharacterCard name="Typhus" image="typhus" route="/characters/typhus" />
          <CharacterCard name="Daemon Prince" image="daemon-prince" route="/characters/daemon" />
        </View>

        {/* Space Marine Section */}
        <View style={styles.sectionTitleContainer}>
        <View style={[styles.sectionTitleBackground, styles.spaceMarineBackground]} />
        <Text style={styles.sectionTitleText}>SPACEMARINE</Text>
        </View>
        
        <View style={styles.characterRow}>
          <CharacterCard name="Tigurius" image="tigurius" route="/characters/tigurius" />
          <CharacterCard name="Roboute   Guilliman" image="roboute-guilliman" route="/characters/roboute" />
        </View>
        <View style={styles.characterRow}>
          <CharacterCard name="Marneus Calgar" image="marneus-calgar" route="/characters/calgar" />
          <CharacterCard name="Uriel Ventris" image="uriel-ventris" route="/characters/ventris" />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'repeat',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  headerText: {
    color: '#2d2d2d',
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sectionTitleContainer: {
    position: 'relative',
    alignItems: 'center',
    marginVertical: 16,
  },
  sectionTitleBackground: {
    position: 'absolute',
    width: '100%',
    height: 40,
    backgroundColor: 'purple', // Default color for Chaos
    transform: [{ skewX: '-20deg' }],
    zIndex: -1,
  },
  sectionTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
    letterSpacing: 2,
    paddingVertical: 8,
    zIndex: 1,
  },
  chaosBackground: {
    backgroundColor: '#3B2731',
  },
  spaceMarineBackground: {
    backgroundColor: '#070355',
  },
  characterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    width: 140,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 8,
  },
  characterImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  characterName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
