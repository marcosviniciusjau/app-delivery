import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import { AppRoutes } from './app.routes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AuthRoutes } from './auth.routes'
import { useAuth } from '../hooks/useAuth'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
export function Routes(){
    const insets= useSafeAreaInsets()
    const { user } = useAuth()
   
  const contextData = useContext(AuthContext)
return( 
<AuthContext.Provider value={contextData}>
  <NavigationContainer>
    {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  </AuthContext.Provider>
  )
 
}