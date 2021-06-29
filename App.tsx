import React from 'react';
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

import { Register } from './src/screens/Register';

import theme from './src/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Register />
    </ThemeProvider>
  );
}
