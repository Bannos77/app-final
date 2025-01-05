import { Stack } from 'expo-router';

export default function UnitLayout() {
  return (
    <Stack>
      <Stack.Screen name='assault' options={{ title: 'Assault Intercessor' }} />
      <Stack.Screen name='berzerkers' options={{ title: 'Khorne Berzerkers' }} />
      <Stack.Screen name='infernus' options={{ title: 'Infernus Squad' }} />
      <Stack.Screen name='intercessors' options={{ title: 'Intercessors' }} />
      <Stack.Screen name='noice' options={{ title: 'Noice Marines' }} />
      <Stack.Screen name='plague' options={{ title: 'Plague Marines' }} />
      <Stack.Screen name='rubric' options={{ title: 'Rubric Marines' }} />
      <Stack.Screen name='terminator' options={{ title: 'Terminator Squad' }} />
    </Stack>
  );
}
