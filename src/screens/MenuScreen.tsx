import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { COLORS } from '../constant/colors';
import CustomButton from '../components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import type { StackNavigationProp } from '@react-navigation/stack';

export default function MenuScreen() {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>TASKY APP</Text>
      <Text style={styles.subtitle}>Impulsa tu productividad diaria</Text>
      
      <View style={styles.buttonContainer}>
        <CustomButton title='Tareas' backgroundColor={COLORS.button.primary} onPress={() => navigation.navigate('Tasks')}/>
        <CustomButton title='Mis datos' backgroundColor={COLORS.button.secondary}  onPress={() => navigation.navigate('Profile')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },
  title: {
    color: COLORS.text.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.text.secondary,
    marginTop: 20,
    fontSize: 16,
  },
  buttonContainer:{
    gap: 16,                // Espacio uniforme entre elementos
    width: '50%',
    paddingHorizontal: 20,
    marginTop: 30,          // Espacio desde subtitle
  }
});