import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacityProps } from 'react-native';
import { faKey,faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { Container, IconBox, Message, TextHighlight } from './styles';
import { useTheme } from 'styled-components';

type Props = TouchableOpacityProps & {
  donorName?: string | null;
};

export function DeliveryStatus({ donorName = null, ...rest }: Props) {
  const theme = useTheme();
  const icon = donorName ? faMotorcycle : faKey;
  const message = donorName ? `Entrega do doador(a)${donorName} sendo feita.` : 'Nenhuma entrega sendo feita.';
  const status = donorName ? 'chegada' : 'saída';

  return (
    <Container {...rest}>
      <IconBox>
        <FontAwesomeIcon icon={icon} size={52} color={theme.COLORS.WHITE} />
      </IconBox>
      <Message>
        {message}
        <TextHighlight>
          Clique aqui para registrar a {status}
        </TextHighlight>
      </Message>
    </Container>
  );
}
