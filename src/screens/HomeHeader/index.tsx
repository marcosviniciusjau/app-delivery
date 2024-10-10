import { TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Container, Greeting, Message, Name, Picture } from './styles';

import theme from '../../theme';

export function HomeHeader() {
  const { signOut,user } = useAuth();
  function handleLogout(){
    signOut()
  }
  return (
    <Container>
  
      <Greeting>
        <Message>
          Olá
        </Message>

        <Name>
          {user?.username}
        </Name>
      </Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <FontAwesomeIcon icon={faPowerOff} size={24} color={theme.COLORS.GRAY_400}/>
      </TouchableOpacity>
    </Container>
  );
}