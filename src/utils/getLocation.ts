import dayjs from "dayjs";
import { LocationSubscription, watchPositionAsync, LocationAccuracy, LocationObjectCoords } from "expo-location";
import { useEffect, useState } from "react";
import { getAddress } from "./getAddress";
import { LocationInfoProps } from "../components/LocationInfo";
const [currentCoords,setCurrentCoords] = useState<LocationObjectCoords | null>(null)
const [finalAddress, setFinalAddress] = useState("")

const [arrival,setArrival]=  useState<LocationInfoProps | null>(null)
useEffect(() => {

  let subscription: LocationSubscription;
  
  watchPositionAsync({
    accuracy: LocationAccuracy.High,
    timeInterval: 1000
  }, (location) => {
    setCurrentCoords(location.coords)
    getAddress(location.coords)
      .then(address => {
        if(address) {
          setFinalAddress(address)
          setArrival({
            label: 'Chegada',
            finalAddress: `Está em ${address ?? ''}`,
            description: dayjs(new Date().getTime()).format('DD/MM/YYYY [às] HH:mm')
          })
      
        }
      })
  }).then(response => subscription = response);
  return () => {
    if(subscription) {
      subscription.remove()
    }
  };
})