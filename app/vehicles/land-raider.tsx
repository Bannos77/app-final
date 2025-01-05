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
          source={require('@/assets/images/land-raider.jpg')} // Local image file
          style={styles.image}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>Land Raider</Text>
          <Text style={styles.points}>240 pts</Text>
        </View>

        <View style={styles.statTable}>
          {renderStatRow(['M', 'T', 'Sv', 'W', 'Ld', 'Oc'], true)}
          {renderStatRow(['10"', '12', '2+', '16', '6+', '5'])}
        </View>

        <Text style={styles.sectionTitle}>Ranged Weapons</Text>

        <Text style={styles.sectionName}>Godhammer lascannon</Text>
                <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                  {renderWeaponRow(['48"', '2', '3+', '12', '-3', 'd6+1'])}
                </View>

                <Text style={styles.sectionName}>Hunter-killer missile</Text>
                <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                  {renderWeaponRow(['48"', '1', '2+', '14', '-3', 'd6'])}
                </View>
                <Text style={styles.sectionExtra}>ONE SHOT</Text>

                <Text style={styles.sectionName}>Multi-melta</Text>
                <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                  {renderWeaponRow(['18"', '2', '3+', '9', '-4', 'd6'])}
                </View>
                <Text style={styles.sectionExtra}>MELTA 2</Text>

                <Text style={styles.sectionName}>Storm bolter</Text>
                <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                  {renderWeaponRow(['24"', '2', '3+', '4', '0', '1'])}
                </View>
                <Text style={styles.sectionExtra}>RAPID FIRE 2</Text>

        <Text style={styles.sectionName}>Twin heavy bolter</Text>
                <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                  {renderWeaponRow(['36"', '3', '3+', '5', '-1', '1'])}
                </View>
                <Text style={styles.sectionExtra}>SUSTAINED HITS 1, TWIN-LINKED</Text>

        

        <Text style={styles.sectionTitle}>Melee Weapons</Text>
        <Text style={styles.sectionName}>Armoured tracks</Text>
                <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'WS', 'S', 'AP', 'D'], true)}
                  {renderWeaponRow(['Melee', '6', '4+', '8', '0', '1'])}
                </View>
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
