import { View, StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import MySplashScreen from './src/components/splashScreen/splashScreen'
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './src/screens/MenuScreen';
import Tasks from './src/screens/TaskListScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { COLORS } from './src/constant/colors';

SplashScreen.preventAutoHideAsync();
export default function App() {

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function prepareApp(){                       // 2. Declara función asíncrona para poder usar 'await'
      await SplashScreen.hideAsync();                  // 5. Oculta el splash screen de forma asíncrona
      await new Promise(resolve=> setTimeout(resolve, 2000))  // 3. Crea una Promise que se resuelve después de 2000ms (2 segundos)
      
      setIsAppReady(true)                             // 4. Cambia el estado de la app a "lista"
    }                                                 // 6. Cierra la función prepareApp
    prepareApp();         
  }, [])

  if (!isAppReady) {
    return <MySplashScreen />; // ← Tu componente
  }

  const Stack = createStackNavigator();

  return (
    <View style={{ flex:1 }}>
      <StatusBar barStyle='light-content' backgroundColor={COLORS.background.primary} translucent={false} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Main'>
          <Stack.Screen name='Main' component={MenuScreen} options={{ title: 'Todo App' }}/>
          <Stack.Screen name='Tasks' component={Tasks} />
          <Stack.Screen name='Profile' component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}




