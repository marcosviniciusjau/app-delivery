import 'react-native-get-random-values';
import './src/libs/dayjs';
import {ThemeProvider} from 'styled-components/native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';


import theme from './src/theme';

import { Routes } from './src/routes';

import { Loading } from './src/components/Loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './src/contexts/AuthContext';

export default function App() {
  const [fontsLoaded]= useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  if(!fontsLoaded){
    return(
      <Loading/>
    );
  }
  return ( 
    <ThemeProvider theme={theme}>
     
      <SafeAreaProvider>
      <AuthContextProvider>
      {fontsLoaded ? <Routes /> : <Loading />}
    </AuthContextProvider>
    </SafeAreaProvider>
    </ThemeProvider>
  );
}