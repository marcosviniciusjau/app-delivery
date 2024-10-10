import { Container, Title, Slogan} from './styles';

import {GoogleSignin} from "@react-native-google-signin/google-signin"
import {Realm,useApp} from "@realm/react";
import backgroundImg from '../../assets/background.png';
import { Button } from '../../components/Button';

import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Input } from '../../components/DonorInput/styles';
import { useNavigation } from '@react-navigation/native';
import { Login } from '../../libs/axios/login';
import { useAuth } from '../../hooks/useAuth';
import { AxiosError } from 'axios';


export  function SignIn() {
  const {signIn} = useAuth()
  const {COLORS}= useTheme();
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [isAuthenticating,setIsAuthenticating] = useState(false)

  async function handleSignIn() {
    try {
      setIsAuthenticating(true)
      await signIn(username,password);
    } catch (error) {
      Alert.alert('Error', "Não foi possivel realizar o login")
      setIsAuthenticating(false)
    }
  }
  return (
    <Container source={backgroundImg}>

      <Title>Volante Livre</Title>
      
      <Slogan>Gestão de uso de veículos</Slogan>
      <Input
        value={username}
        style={{width:300}}
        placeholderTextColor={COLORS.GRAY_400}
         onChange={(e)=>setUsername(e.nativeEvent.text)}
         />
         <Input
         value={password}
         style={{width:300}}
         placeholderTextColor={COLORS.GRAY_400}
         secureTextEntry
          onChange={(e)=>setPassword(e.nativeEvent.text)}
          />
      <Button 
        onPress={handleSignIn}
        title="Entrar" />

    </Container>
  );
}

