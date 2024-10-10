import { api } from "../api";

export async function GetDeliveryById(userId:any,id:any) {
  try{
    const response = await api.get(`/delivery/${userId}/${id}`)
    return response
  }catch (error) {
  console.error(error)
  }
}