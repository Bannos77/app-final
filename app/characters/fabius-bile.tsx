import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { API_URL } from '@/constants/Api';

type Favourite = {
  _id: string;
  userId: string;
  itemId: string;
  createdAt?: string;
  updatedAt?: string;
};

const FabiusBileCard = () => {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteId, setFavouriteId] = useState<string | null>(null);

  // If API_URL is a base, append /favorites; if it's already the endpoint, use as-is
  const FAV_URL = API_URL.endsWith('/favorites') ? API_URL : `${API_URL}/favorites`;

  // TODO: replace with real auth user
  const userId = '123';
  const itemId = 'fabius-bile';

  // ---- Safe haptic helpers ----
  const hapticImpact = async () => {
    if (Platform.OS === 'web') return;
    try { await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); } catch {}
  };
  const hapticSelection = async () => {
    if (Platform.OS === 'web') return;
    try { await Haptics.selectionAsync(); } catch {}
  };

  // Robust JSON reader (helps catch HTML/error bodies)
  const readJson = async (res: Response) => {
    const text = await res.text();
    try { return JSON.parse(text); }
    catch {
      throw new Error(`Expected JSON but got: ${text.slice(0, 120)}...`);
    }
  };

  // Load favourite status on mount
  useEffect(() => {
    const fetchFavourite = async () => {
      try {
        const res = await fetch(`${FAV_URL}?userId=${encodeURIComponent(userId)}`);
        if (!res.ok) {
          console.error('Failed to fetch favourites:', res.status);
          return;
        }
        const data = (await readJson(res)) as Favourite[];
        const existing = data.find((f) => f.itemId === itemId);
        if (existing) {
          setIsFavourite(true);
          setFavouriteId(existing._id);
        }
      } catch (err) {
        console.error('Error fetching favourites:', err);
      }
    };

    fetchFavourite();
  }, []);

  const handlePress = async (route: '/(tabs)/explore') => {
    await hapticImpact();
    router.push(route);
  };

  const toggleFavourite = async () => {
    try {
      if (isFavourite && favouriteId) {
        // Remove favourite
        const res = await fetch(`${FAV_URL}/${favouriteId}`, { method: 'DELETE' });
        if (!res.ok) {
          console.error('Failed to delete favourite:', res.status);
          Alert.alert("Error", "Failed to remove favourite");
          return;
        }
        setIsFavourite(false);
        setFavouriteId(null);
      } else {
        // Add favourite
        const res = await fetch(FAV_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, itemId }),
        });
        if (!res.ok) {
          console.error('Failed to add favourite:', res.status);
          Alert.alert("Error", "Failed to add favourite");
          return;
        }
        const data = await readJson(res) as { favorite?: Favourite };
        if (data?.favorite?._id) {
          setIsFavourite(true);
          setFavouriteId(data.favorite._id);
        }
      }
      await hapticSelection();
    } catch (err: any) {
      console.error('Error toggling favourite:', err);
      Alert.alert("Error", err.message || "Something went wrong.");
    }
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

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavourite}
        >
          <Text style={styles.favoriteText}>
            {isFavourite ? '★' : '☆'} Favourite
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/fabius-bile.jpg')}
          style={styles.image}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>Fabius Bile</Text>
          <Text style={styles.points}>85 pts</Text>
        </View>

        <View style={styles.statTable}>
          {renderStatRow(['M', 'T', 'Sv', 'W', 'Ld', 'Oc'], true)}
          {renderStatRow(['6"', '4', '3+', '5', '6+', '1'])}
        </View>

        <Text style={styles.subtitle}>Surgeon Acolyte</Text>
        <View style={styles.statTable}>
          {renderStatRow(['M', 'T', 'Sv', 'W', 'Ld', 'Oc'], true)}
          {renderStatRow(['6"', '4', '6+', '1', '7+', '1'])}
        </View>

        <Text style={styles.sectionTitle}>Ranged Weapons</Text>
        <Text style={styles.sectionName}>Xyclos Needler</Text>
        <View style={styles.weaponTable}>
          {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
          {renderWeaponRow(['18"', '3', '2+', '2', '-1', '2'])}
        </View>
        <Text style={styles.sectionExtra}>ANTI-INFANTRY 2+, PISTOL</Text>

        <Text style={styles.sectionTitle}>Melee Weapons</Text>
        <Text style={styles.sectionName}>Chirurgeon</Text>
        <View style={styles.weaponTable}>
          {renderWeaponRow(['Range', 'A', 'WS', 'S', 'AP', 'D'], true)}
          {renderWeaponRow(['Melee', '2', '2+', '4', '0', '1'])}
        </View>
        <Text style={styles.sectionExtra}>EXTRA ATTACKS</Text>

        <Text style={styles.sectionName}>Rod of Torment</Text>
        <View style={styles.weaponTable}>
          {renderWeaponRow(['Range', 'A', 'WS', 'S', 'AP', 'D'], true)}
          {renderWeaponRow(['Melee', '6', '2+', '5', '-1', '3'])}
        </View>

        <Text style={styles.sectionName}>Surgeon Acolyte's tools</Text>
        <View style={styles.weaponTable}>
          {renderWeaponRow(['Range', 'A', 'WS', 'S', 'AP', 'D'], true)}
          {renderWeaponRow(['Melee', '1', '5+', '3', '0', '1'])}
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
  container: { flexGrow: 1, padding: 16, backgroundColor: '#4b4b4b' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  backButton: { padding: 8, backgroundColor: '#ddd', borderRadius: 4 },
  textBack: { color: '#000', fontWeight: 'bold' },
  favoriteButton: { padding: 8, backgroundColor: '#ddd', borderRadius: 4 },
  favoriteText: { color: '#000', fontWeight: 'bold' },
  imageContainer: { alignItems: 'center', marginVertical: 16 },
  image: { width: 240, height: 240, resizeMode: 'contain', backgroundColor: '#fff', borderRadius: 8 },
  detailsContainer: { backgroundColor: '#5a5a5a', borderRadius: 8, padding: 16 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  points: { fontSize: 16, color: '#ff4d4d' },
  statTable: { marginVertical: 8 },
  statRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 2 },
  statCell: { flex: 1, textAlign: 'center', padding: 4, borderWidth: 1, borderColor: '#888', fontSize: 14, color: '#fff' },
  headerRow: { backgroundColor: '#333' },
  headerCell: { fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginVertical: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginTop: 16, marginBottom: 8 },
  sectionName: { fontSize: 14, fontWeight: '500', color: '#fff', marginTop: 10 },
  sectionExtra: { fontSize: 12, fontWeight: 'bold', color: '#ff4d4d', marginTop: 5 },
  weaponTable: { marginVertical: 5 },
  weaponRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 2 },
  weaponCell: { flex: 1, textAlign: 'center', padding: 4, borderWidth: 1, borderColor: '#888', fontSize: 14, color: '#fff' },
});

export default FabiusBileCard;
