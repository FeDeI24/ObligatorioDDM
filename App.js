import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//Se importa el archivo que tiene todas las pantallas en él
import RootStack from './src/routes/RootStack';

export default function App() {
  return (
    <RootStack></RootStack>
  );
}
