import { Stack } from 'expo-router';

export default function UnitLayout() {
  return (
    <Stack>
      <Stack.Screen name='abaddon' options={{ title: 'Abaddon the Despoiler' }} />
      <Stack.Screen name='daemon' options={{ title: 'Daemon Prince' }} />
      <Stack.Screen name='fabius-bile' options={{ title: 'Fabius Bile' }} />
      <Stack.Screen name='typhus' options={{ title: 'Typhus' }} />
      <Stack.Screen name='tigurius' options={{ title: 'Chief Librarian Tigurius' }} />
      <Stack.Screen name='roboute' options={{ title: 'Roboute Guilliman' }} />
      <Stack.Screen name='calgar' options={{ title: 'Marneus Calgar' }} />
      <Stack.Screen name='ventris' options={{ title: 'Uriel Ventris' }} />
    </Stack>
  );
}
