import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

const FabiusBileCard = () => {
  const router = useRouter();

  const handlePress = (route: '/(tabs)/explore') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Trigger haptic feedback
    router.push(route); // Navigate to the desired screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handlePress('/(tabs)/explore')}
        >
          <Text style={styles.textBack}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.favoriteText}>Favorite</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/uriel-ventris.jpg')} // Local image file
          style={styles.image}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>Uriel Ventris</Text>
          <Text style={styles.points}>95 pts</Text>
        </View>

        <View style={styles.statTable}>
          {renderStatRow(['M', 'T', 'Sv', 'W', 'Ld', 'Oc'], true)}
          {renderStatRow(['6"', '4', '3+', '5', '6+', '1'])}
        </View>

        <Text style={styles.sectionTitle}>Ranged Weapons</Text>
        <Text style={styles.sectionName}>Bolt Pistol</Text>
         <View style={styles.weaponTable}>
           {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
           {renderWeaponRow(['12"', '1', '2+', '4', '0', '1'])}
          </View>
        <Text style={styles.sectionExtra}>PISTOL</Text>

        <Text style={styles.sectionName}>Invictus</Text>
        <View style={styles.weaponTable}>
          {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
          {renderWeaponRow(['24"', '2', '2+', '4', '-1', '2'])}
        </View>

        <Text style={styles.sectionTitle}>Melee Weapons</Text>
        <Text style={styles.sectionName}>Sword of Idaeus</Text>
        <View style={styles.weaponTable}>
          {renderWeaponRow(['Range', 'A', 'WS', 'S', 'AP', 'D'], true)}
          {renderWeaponRow(['Melee', '6', '2+', '6', '-2', '2'])}
        </View>
        <Text style={styles.sectionExtra}>SUSTAINED HITS 1</Text>

      </View>
    </ScrollView>
  );
};

const renderStatRow = (stats: string[], isHeader: boolean = false) => {
  return (
    <View style={[styles.statRow, isHeader ? styles.headerRow : null]}>
      {stats.map((stat: string, index: number) => (
        <Text
          key={index}
          style={[styles.statCell, isHeader ? styles.headerCell : null]}
        >
          {stat}
        </Text>
      ))}
    </View>
  );
};

const renderWeaponRow = (stats: string[], isHeader: boolean = false) => {
  return (
    <View style={[styles.weaponRow, isHeader ? styles.headerRow : null]}>
      {stats.map((stat, index) => (
        <Text
          key={index}
          style={[styles.weaponCell, isHeader ? styles.headerCell : null]}
        >
          {stat}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#4b4b4b', // Matches the grayish background
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  textBack: {
    color: '#000',
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  favoriteText: {
    color: '#000',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  detailsContainer: {
    backgroundColor: '#5a5a5a', // Dark gray background
    borderRadius: 8,
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  points: {
    fontSize: 16,
    color: '#ff4d4d',
  },
  statTable: {
    marginVertical: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 2,
  },
  statCell: {
    flex: 1,
    textAlign: 'center',
    padding: 4,
    borderWidth: 1,
    borderColor: '#888',
    fontSize: 14,
    color: '#fff',
  },
  headerRow: {
    backgroundColor: '#333',
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionName: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#fff',
    marginTop: 10,
    marginBottom: 0,
  },
  sectionExtra: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff4d4d',
    marginTop: 5,
    marginBottom: 0,
  },
  weaponTable: {
    marginVertical: 5,
  },
  weaponRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 2,
  },
  weaponCell: {
    flex: 1,
    textAlign: 'center',
    padding: 4,
    borderWidth: 1,
    borderColor: '#888',
    fontSize: 14,
    color: '#fff',
  },
});

export default FabiusBileCard;
