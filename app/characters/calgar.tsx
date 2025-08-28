import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
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

  // API endpoint (can be base or full)
  const FAV_URL = API_URL.endsWith('/favorites') ? API_URL : `${API_URL}/favorites`;

  // TODO: replace with real auth user
  const userId = '123';
  const itemId = 'fabius-bile-card';

  // ---- Safe haptic helpers ----
  const hapticImpact = async () => {
    if (Platform.OS === 'web') return;
    try { await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); } catch {}
  };
  const hapticSelection = async () => {
    if (Platform.OS === 'web') return;
    try { await Haptics.selectionAsync(); } catch {}
  };

  // Robust JSON reader
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
          return;
        }
        const data = await readJson(res) as { favorite?: Favourite };
        if (data?.favorite?._id) {
          setIsFavourite(true);
          setFavouriteId(data.favorite._id);
        }
      }
      await hapticSelection();
    } catch (err) {
      console.error('Error toggling favourite:', err);
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
            {isFavourite ? '★ Favourite' : '☆ Favourite'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/marneus.jpg')} // Local image file
          style={styles.image}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>Marneus Calgar</Text>
          <Text style={styles.points}>200 pts</Text>
        </View>

        <View style={styles.statTable}>
          {renderStatRow(['M', 'T', 'Sv', 'W', 'Ld', 'Oc'], true)}
          {renderStatRow(['6"', '6', '2+', '6', '6+', '1'])}
        </View>

        <Text style={styles.subtitle}>Victrix Honour Guard</Text>
        <View style={styles.statTable}>
          {renderStatRow(['M', 'T', 'Sv', 'W', 'Ld', 'Oc'], true)}
          {renderStatRow(['6"', '4', '2+', '3', '6+', '1'])}
        </View>

        <Text style={styles.sectionTitle}>Ranged Weapons</Text>
        <Text style={styles.sectionName}>Gauntlets of Ultramar</Text>
        <View style={styles.weaponTable}>
          {renderWeaponRow(['Range', 'A', 'BS', 'S', 'AP', 'D'], true)}
          {renderWeaponRow(['18"', '4', '2+', '4', '-1', '2'])}
        </View>
        <Text style={styles.sectionExtra}>PISTOL, TWIN-LINKED</Text>

        <Text style={styles.sectionTitle}>Melee Weapons</Text>
        <Text style={styles.sectionName}>Gauntlets of Ultramar </Text>
        <View style={styles.weaponTable}>
          {renderWeaponRow(['Range', 'A', 'WS', 'S', 'AP', 'D'], true)}
          {renderWeaponRow(['Melee', '6', '2+', '8', '-3', '3'])}
        </View>
        <Text style={styles.sectionExtra}>TWIN-LINKED</Text>

        <Text style={styles.sectionName}>Victrix power sword</Text>
        <View style={styles.weaponTable}>
          {renderWeaponRow(['Range', 'A', 'WS', 'S', 'AP', 'D'], true)}
          {renderWeaponRow(['Melee', '5', '2+', '5', '-2', '2'])}
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
  sectionName: { fontSize: 14, fontWeight: '500', color: '#fff', marginTop: 10, marginBottom: 0 },
  sectionExtra: { fontSize: 12, fontWeight: 'bold', color: '#ff4d4d', marginTop: 5, marginBottom: 0 },
  weaponTable: { marginVertical: 5 },
  weaponRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 2 },
  weaponCell: { flex: 1, textAlign: 'center', padding: 4, borderWidth: 1, borderColor: '#888', fontSize: 14, color: '#fff' },
});

export default FabiusBileCard;
