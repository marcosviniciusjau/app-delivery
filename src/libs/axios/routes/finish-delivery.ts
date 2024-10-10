import { AxiosError } from "axios";
import { api } from "../api";
import { LocationObjectCoords } from "expo-location";

export async function FinishDeliveries(deliveryId:any, finalAddress: string,endedAt:Date) {
  try{
    const response = await api.post(`/delivery/finish/${deliveryId}`,{finalAddress,endedAt})
    return response
  }catch (error: any) {
    console.error(error)
  }
  
}
