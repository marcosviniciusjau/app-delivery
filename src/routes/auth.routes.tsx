import { NativeStackNavigationProp, createNativeStackNavigator} from '@react-navigation/native-stack'
import { SignIn } from '../screens/SignIn' 

type AuthRoutes = {
  signIn: undefined 
  signUp: undefined 
}

export type AuthNavigatorProps = NativeStackNavigationProp<AuthRoutes> 
const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>() 

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen 
        name="signIn"
        component={SignIn} 
      />
    </Navigator>
  )
}