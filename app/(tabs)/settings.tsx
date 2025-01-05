import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

const CharacterCard = ({ name, image, route }: { name: string; image: string; route: string }) => {
  const router = useRouter();

  const images: any = {
    'plague': require('@/assets/images/plague-marine.jpg'),
    'rubric': require('@/assets/images/rubric-marine.jpg'),
    'berzerkers': require('@/assets/images/khorne-berzerker.jpg'),
    'noice': require('@/assets/images/noice-marine.jpg'),
    'intercessors': require('@/assets/images/intercessor.jpg'),
    'assault': require('@/assets/images/assault-intercessor.jpg'),
    'infernus-squad': require('@/assets/images/infernus-squad.jpg'),
    'terminator': require('@/assets/images/terminator.jpg'),
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

export default function UnitScreen() {
  return (
    <ImageBackground
      source={require('@/assets/images/background.jpeg')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Units</Text>
        </View>

        {/* Chaos Section */}
        <View style={styles.sectionTitleContainer}>
                <View style={[styles.sectionTitleBackground, styles.chaosBackground]} />
                <Text style={styles.sectionTitleText}>CHAOS</Text>
                </View>

        <View style={styles.characterRow}>
          <CharacterCard name="Plague Marines" image="plague" route="/unit/plague" />
          <CharacterCard name="Rubric Marines" image="rubric" route="/unit/rubric" />
        </View>
        <View style={styles.characterRow}>
          <CharacterCard name="Khorne Berzerkers" image="berzerkers" route="/unit/berzerkers" />
          <CharacterCard name="Noice Marines" image="noice" route="/unit/noice" />
        </View>

        {/* Space Marine Section */}
        <View style={styles.sectionTitleContainer}>
                <View style={[styles.sectionTitleBackground, styles.spaceMarineBackground]} />
                <Text style={styles.sectionTitleText}>SPACEMARINE</Text>
                </View>
                
        <View style={styles.characterRow}>
          <CharacterCard name="Intercessors" image="intercessors" route="/unit/intercessors" />
          <CharacterCard name="Assault Intercessors" image="assault" route="/unit/assault" />
        </View>
        <View style={styles.characterRow}>
          <CharacterCard name="Infernus Squad" image="infernus-squad" route="/unit/infernus" />
          <CharacterCard name="Terminator Squad" image="terminator" route="/unit/terminator" />
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
