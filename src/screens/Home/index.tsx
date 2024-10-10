import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Alert,FlatList } from "react-native"
import Toast from "react-native-toast-message"
import dayjs from "dayjs"

import { useState } from "react"

import { DeliveryStatus } from "../../components/DeliveryStatus"
import { DeliveryCard, DeliveryCardProps } from "../../components/DeliveryCard"

import { Container, Content, Label, Title } from "./styles"
import { AppNavigatorProps } from "../../routes/app.routes"
import { GetDeliveries } from "../../libs/axios/routes/get-deliveries"
import { HomeHeader } from "../HomeHeader"
import { useAuth } from "../../hooks/useAuth"
export function Home() {
  const [deliveries,setDeliveries]= useState<DeliveryCardProps[]>([])
  const [donorName,setDonorName]= useState("")
  const {user} = useAuth()
  const userId = user.id
  const navigation = useNavigation<AppNavigatorProps>()
  function handleDeliveriesDetails(id:string) {
    navigation.navigate('arrival',{id})
  }

  async function handleRegisterMovement() {
    const response = await GetDeliveries(userId)
    const deliveryInProgress = response.data.find(delivery => delivery.is_on_delivering === true)

    const id = deliveryInProgress ? deliveryInProgress.id : null
      if(id) {
        navigation.navigate('arrival', { id})
      } else {
        navigation.navigate('departure')
      }
  }

  const fetchDeliveries = async () => {
    try {
      const response = await GetDeliveries(userId)
      const isOnDelivering = response.data.some(delivery => delivery.is_on_delivering === true)

      const deliveryInProgress = response.data.find(delivery => delivery.is_on_delivering === true)

      const donorName = deliveryInProgress ? deliveryInProgress.donor_name : null

      if (isOnDelivering == true) {
        setDonorName(donorName)
      } else {
        setDonorName(null)
      }
      setDeliveries(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  useFocusEffect(() => {
    fetchDeliveries()
  })
  
  return (
    <Container>
      <HomeHeader/>
      <Content>
      <DeliveryStatus    
        donorName={donorName}
        onPress={handleRegisterMovement}/>
        <Title>
          Histórico
        </Title>

        <FlatList
          data={deliveries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => 
          <DeliveryCard data={item} 
          onPress={() => handleDeliveriesDetails(item.id)}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100
          }}
          ListEmptyComponent={(
            <Label>
              Nenhuma entrega encontrada
            </Label>
          )}
        />
      </Content>
    </Container>
  )
}
