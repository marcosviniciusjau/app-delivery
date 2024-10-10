import { AxiosError } from "axios";
import { api } from "../api";
import { LocationObjectCoords } from "expo-location";
export type Coords = {
  latitude: number;
  longitude: number;
  timestamp: Date
}[]
export async function initDelivery(donor:string, currentAddress:string,userId: number) {
  try{
    await api.post('/delivery/init', {donor, currentAddress,userId})
    return true
  }catch (error: any) {
    console.error(error)
  }
}