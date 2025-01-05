import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)"  options={{ headerShown: false }} />
      <Stack.Screen name="characters"  options={{ headerShown: false }} />
      <Stack.Screen name="unit"  options={{ headerShown: false }} />
      <Stack.Screen name="vehicles"  options={{ headerShown: false }} />
    </Stack>
  );
}