import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack'
import {Home} from '../screens/Home'
import {Departure} from '../screens/Departure'
import { Arrival } from '../screens/Arrival';
import { useAuth } from '../hooks/useAuth';

export type AppRoutes = {
    home: undefined 
    departure: undefined 
    arrival: {
        id:string
    }
  }
  
export type AppNavigatorProps = NativeStackNavigationProp<AppRoutes> 
const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>() 

export function AppRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen
            name="home"
            component={Home}/>

            <Screen
            name="departure"
            component={Departure}/>

            <Screen
            name="arrival"
            component={Arrival}/>
            </Navigator>

    )
}