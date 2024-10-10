import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { faClosedCaptioning, faListNumeric, faX } from '@fortawesome/free-solid-svg-icons';
import { useNavigation,useFocusEffect, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';

import { LatLng, LocalTile } from 'react-native-maps'

import { Container, Content, Description, Footer, LicensePlate,AsyncMessage } from './styles';

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Map } from '../../components/Map'
import { Loading } from '../../components/Loading'
import { Locations } from '../../components/Locations'

import {  getStorageLocations} from '../../libs/asyncStorage/LocationStorage'
import { getAddress } from '../../utils/getAddress'
import { LocationInfoProps } from '../../components/LocationInfo'
import { DeliveryCardProps } from '../../components/DeliveryCard'
import { LocationAccuracy, LocationObjectCoords, LocationSubscription, useForegroundPermissions, watchPositionAsync } from 'expo-location';

import { useAuth } from '../../hooks/useAuth';
import { FinishDeliveries } from '../../libs/axios/routes/finish-delivery'
import { GetDeliveryById } from '../../libs/axios/routes/get-delivery-by-id'

type RouteParams={
    id:string
}

export function Arrival() {
  const [deliveries, setDeliveries] = useState([]);
  const [departure,setDeparture]= useState<LocationInfoProps | null>(null)
  const [arrival,setArrival]=  useState<LocationInfoProps | null>(null)
  const [title, setTitle] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [locationPermission, requestLocationPermission] = useForegroundPermissions();
  const [delivered, setDelivered] = useState(false);
  
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const { goBack } = useNavigation();
  const { user } = useAuth();
  const userId = user.id;

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const response = await GetDeliveryById(userId, id);
        const deliveryData = response.data;
        const isOnDelivering = deliveryData.is_on_delivering;
        setTitle(deliveryData.donor_name);
        
        setDeparture({
          label: 'Partida',
          initialAddress: `Saiu de ${deliveryData.initial_address ?? ''}`,
          description: dayjs(new Date(deliveryData.created_at)).format('DD/MM/YYYY [às] HH:mm')
        });
        
        if (!isOnDelivering && deliveryData.final_address) {
          setDelivered(false);
          setArrival({
            label: 'Chegada',
            finalAddress: `Chegada em ${deliveryData.final_address ?? ''}`,
            description: dayjs(new Date(deliveryData.ended_at)).format('DD/MM/YYYY [às] HH:mm')
          });
        } else {
          setDelivered(true);
          if (locationPermission?.granted) {
            const watchLocation = async () => {
              const subscription = await watchPositionAsync({
                accuracy: LocationAccuracy.High,
                timeInterval: 1000,
              }, async (location) => {
                const address = await getAddress(location.coords);
                setArrival({
                  label: 'Chegada',
                  finalAddress: `Chegada em ${address ?? ''}`,
                  description: dayjs().format('DD/MM/YYYY [às] HH:mm')
                });
              });

              return () => subscription.remove();
            };
            watchLocation();
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeliveryData();
  }, [locationPermission?.granted, userId, id]);

  const handleArrivalRegister = async () => {
    setIsRegistering(true);
    try {
      const deliveryId = id;
      const endedAt = new Date();
      const finalAddressDB = arrival?.finalAddress.replace('Chegada em','')
      await FinishDeliveries(deliveryId, finalAddressDB, endedAt);
      Alert.alert('Chegada', 'Chegada registrada com sucesso');
      goBack();
    } catch (error) {
      console.error(error);
      setIsRegistering(false);
    }
  };
  return (
    <Container>
      <Header title={title}/>
      <Content>
      {departure && arrival && <Locations departure={departure} arrival={arrival} />}
      {delivered && (
              <Button
                title="Registrar Chegada"
                isLoading={isRegistering}
                onPress={handleArrivalRegister}
              />
         )}
         
            
         </Content>
    </Container>
  );
}