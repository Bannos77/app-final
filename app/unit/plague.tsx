import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

const FabiusBileCard = () => {
  const router = useRouter();
    const [isSaved, setIsSaved] = useState(false); // State to track favorite status
  
    const handlePress = (route: '/(tabs)/settings') => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Trigger haptic feedback
      router.push(route); // Navigate to the desired screen
    };
  
    const toggleFavorite = () => {
      setIsSaved(!isSaved); // Toggle favorite status
      Haptics.selectionAsync(); // Provide feedback for toggling
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => handlePress('/(tabs)/settings')}
          >
            <Text style={styles.textBack}>Back</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <Text style={styles.favoriteText}>
              {isSaved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/unit-plague.jpg')} // Local image file
          style={styles.image}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>Plague Marines</Text>
          <Text style={styles.points}>180 pts</Text>
        </View>

        <View style={styles.statTable}>
          {renderStatRow(['M', 'T', 'Sv', 'W', 'Ld', 'Oc'], true)}
          {renderStatRow(['5"', '5', '3+', '2', '6+', '2'])}
        </View>

        <Text style={styles.sectionTitle}>Ranged Weapons</Text>
        <Text style={styles.sectionTitle}>Blight launcher</Text>
                  <View style={styles.weaponTable}>
                    {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                      {renderWeaponRow(['24"', '2', '3+', '6', '-1', '2',])}
                     </View>
                     <Text style={styles.sectionExtra}>LETHAL HITS</Text>

                <Text style={styles.sectionTitle}>Meltagun</Text>
                 <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                   {renderWeaponRow(['12"', '1', '3+', '9', '-4', 'D6'])}
                   </View>
                  <Text style={styles.sectionExtra}>MALTA 2</Text>

                  <Text style={styles.sectionTitle}>Plague belcher</Text>
                 <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                   {renderWeaponRow(['12"', 'D6', 'N/A', '4', '0', '1'])}
                 </View>
                <Text style={styles.sectionExtra}>ANTI-INFANTRY 4+, IGNORES COVER, TORRENT</Text>
        
                <Text style={styles.sectionTitle}>Bolt pistol</Text>
                  <View style={styles.weaponTable}>
                    {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                      {renderWeaponRow(['12"', '1', '3+', '4', '0', '1',])}
                      </View>
                    <Text style={styles.sectionExtra}>LETHAL HITS, PISTOL</Text>
                        
                <Text style={styles.sectionTitle}>Boltgun</Text>
                    <View style={styles.weaponTable}>
                      {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                        {renderWeaponRow(['24"', '2', '3+', '4', '0', '1'])}
                       </View>
                      <Text style={styles.sectionExtra}>LETHAL HITS</Text>
                                
                  <Text style={styles.sectionTitle}>Plague spewer</Text>
                 <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                   {renderWeaponRow(['12"', 'D6', 'N/A', '5', '-1', '1'])}
                 </View>
                <Text style={styles.sectionExtra}>ANTI-INFANTRY 2+, IGNORES COVER, TORRENT</Text>

                <Text style={styles.sectionTitle}>Plasma gun - standard</Text>
                 <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                   {renderWeaponRow(['24"', '1', '3+', '7', '-2', '1'])}
                   </View>
                  <Text style={styles.sectionExtra}>RAPID FIRE 1</Text>
                                
                  <Text style={styles.sectionTitle}>Plasma gun - supercharge</Text>
                 <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                   {renderWeaponRow(['24"', '1', '3+', '8', '-3', '2'])}
                 </View>
                <Text style={styles.sectionExtra}>HAZADOUS, RAPID FIRE 1</Text>

                <Text style={styles.sectionTitle}>Plasma pistol - standard</Text>
                 <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                   {renderWeaponRow(['12"', '1', '3+', '7', '-2', '1'])}
                   </View>
                  <Text style={styles.sectionExtra}>PISTOL</Text>
                                
                  <Text style={styles.sectionTitle}>Plasma pistol - supercharge</Text>
                 <View style={styles.weaponTable}>
                  {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
                   {renderWeaponRow(['12"', '1', '3+', '8', '-3', '2'])}
                 </View>
                <Text style={styles.sectionExtra}>HAZADOUS, PISTOL</Text>

              

        <Text style={styles.sectionTitle}>Melee Weapons</Text>
        <Text style={styles.sectionName}>Bubotic weapons </Text>
        <View style={styles.weaponTable}>
          {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
          {renderWeaponRow(['Melee', '4', '3+', '5', '-2', '1'])}
        </View>
        <Text style={styles.sectionExtra}>LETHAL HITS</Text>
        
        <Text style={styles.sectionName}>Heavy plague weapon</Text>
        <View style={styles.weaponTable}>
          {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
          {renderWeaponRow(['Melee', '3', '4+', '8', '-2', '2'])}
        </View>
        <Text style={styles.sectionExtra}>LETHAL HITS</Text>

        <Text style={styles.sectionName}>Plague knives</Text>
        <View style={styles.weaponTable}>
          {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
          {renderWeaponRow(['Melee', '3', '3+', '4', '0', '1'])}
        </View>
        <Text style={styles.sectionExtra}>LETHAL HITS</Text>

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
  weaponTable: {
    marginVertical: 5,
  },
  sectionExtra: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff4d4d',
    marginTop: 5,
    marginBottom: 0,
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
