import { useEffect, useRef, useState } from 'react';
import { TextInput,ScrollView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
   useForegroundPermissions,
   requestBackgroundPermissionsAsync,
   watchPositionAsync,
   LocationAccuracy,
   LocationSubscription,
   LocationObjectCoords
} from 'expo-location';

import { useNavigation } from '@react-navigation/native';


import { getAddress } from '../../utils/getAddress';

import { Container, Content, Message, MessageContent } from './styles';

import { Header } from '../../components/Header';
import { DonorInput } from '../../components/DonorInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { Map } from '../../components/Map';
import { LocationInfo } from '../../components/LocationInfo';
import { faCar, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { openSettings } from '../../utils/openSettings';
import { Coords, initDelivery } from '../../libs/axios/routes/init-delivery';
import { useAuth } from '../../hooks/useAuth';
import { saveStorageLocation } from '../../libs/asyncStorage/LocationStorage';
import { LocationProps } from '../../libs/asyncStorage/LocationStorage';

export function Departure() {
  const [donorName,setDonor]= useState('');
  const {user} = useAuth()
  const userId = user.id
  const [isRegistering,setIsRegistering]= useState(false);
  const [isLoading, setIsLoading] = useState(true);  
  const [currentAddress,setCurrentAddress] = useState<string>("");
  const [currentCoords,setCurrentCoords] = useState<LocationObjectCoords | null>(null);

  const [locationPermission,requestLocationPermission]= useForegroundPermissions();

  const {goBack}= useNavigation();

  const donorRef= useRef<TextInput>(null);

  async function handleDepartureRegister() {
    try{
      if(donorName.trim().length === 0){
        donorRef.current?.focus();
        return Alert.alert('Nome inválido', 'Nome inválido');
      }

      setIsRegistering(true);
  
      try {
        await initDelivery(donorName, currentAddress,userId)
      } catch (error) {
        console.error(error)
      }
      Alert.alert('Saída', 'Sua saída foi registrada com sucesso')
      goBack()

    }catch(error){
      console.log(error)
      Alert.alert('Erro', 'Ocorreu um erro ao registrar a saída')
      setIsRegistering(false)
    }
  }

  useEffect(()=>{
    requestLocationPermission();
  })

  useEffect(() => {
    if(!locationPermission?.granted){
      return
    } 
    let subscription: LocationSubscription;
    
    watchPositionAsync({
      accuracy: LocationAccuracy.High,
      timeInterval: 1000
    }, (location) => {
      getAddress(location.coords)
        .then(address => {
          if(address) {
            setCurrentAddress(address)
          }
        })
        .finally(() => setIsLoading(false))
    }).then(response => subscription = response);
    return () => {
      if(subscription) {
        subscription.remove()
      }
    };
  }, [locationPermission?.granted])


  if(!locationPermission?.granted) {
    return (
      <Container>
        <Header title='Saída' />
        <MessageContent>
        <Message>
          Você precisa permitir que o aplicativo tenha acesso a 
          localização para acessar essa funcionalidade. Por favor, acesse as
          configurações do seu dispositivo para conceder a permissão ao aplicativo.
        </Message>
        <Button title="Abrir configurações" onPress={openSettings} />
        </MessageContent>

      </Container>
    )
  }
  
    return (
      <Container>
        <Header title="Entrega"/>
  
        <KeyboardAwareScrollView extraHeight={100}>
          <ScrollView>
           <Content>
           {
                currentAddress &&
                <LocationInfo
                  icon={faMotorcycle}
                  label='Localização atual'
                  initialAddress={currentAddress}
                />
              }
              <DonorInput
                ref={donorRef}
                label="Nome do doador"
                onSubmitEditing={() => donorRef.current?.focus()}
                returnKeyType="next"
                onChangeText={setDonor}
              />
  
              <Button
              title="Registrar Saída"
              isLoading={isRegistering}
              onPress={handleDepartureRegister}
              />
            </Content>
          </ScrollView>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
