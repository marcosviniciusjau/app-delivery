import { AxiosError } from "axios";
import { api } from "../api";
import { LocationObjectCoords } from "expo-location";

export async function GetDeliveries(userId:any) {
  try{
    const response = await api.get(`/delivery/${userId}`)
    return response
  }catch (error: any) {
  console.error(error)
  }
}