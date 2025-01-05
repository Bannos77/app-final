import { Stack } from 'expo-router';

export default function VehiclesLayout() {
  return (
    <Stack>
      <Stack.Screen name="chaos-rhino" options={{ title: 'chaos rhino' }} />
      <Stack.Screen name="chaos-predator" options={{ title: 'chaos predator' }} />
      <Stack.Screen name="chaos-land-raider" options={{ title: 'chaos land raider' }} />
      <Stack.Screen name="land-raider" options={{ title: 'land raider' }} />
      <Stack.Screen name="predator" options={{ title: 'predator' }} />
      <Stack.Screen name="rhino" options={{ title: 'rhino' }} />
      <Stack.Screen name="knight" options={{ title: 'knight' }} />
      <Stack.Screen name="dreadnought" options={{ title: 'dreadnought' }} />
    </Stack>
  );
}
