import { TouchableOpacityProps } from 'react-native';
import { Arrival, Container, Departure, DonorName, Info } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTheme } from 'styled-components/native';
import { faCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

export type DeliveryCardProps = {
    id: string;
    donor_name: string;
    initial_address: string;
    final_address?: string;
    ended_at?: string;
    created_at: string;
    is_on_delivering: boolean
}

type Props= TouchableOpacityProps &{
    data: DeliveryCardProps;
};

export function DeliveryCard({ data, ...rest }: Props) {
    const {COLORS}= useTheme();
    const endedAt = data.ended_at
    ? dayjs(new Date(data.ended_at)).format('DD/MM/YYYY [às] HH:mm')
    : 'Não foi finalizado ainda';

  return (
    <Container activeOpacity={0.7} {...rest}>
        <Info>
            <DonorName>
                Doador(a): {data.donor_name}
            </DonorName>
            <DonorName>
                Onde começou: {data.initial_address}
            </DonorName>
            <DonorName>
                Onde terminou: {data.final_address}
            </DonorName>
            <Departure>
                Horário que começou: {dayjs(new Date(data.created_at)).format('DD/MM/YYYY [às] HH:mm')}
            </Departure>
            <Arrival>
            Horário que terminou: {endedAt}
            </Arrival>
        </Info>
        {data.is_on_delivering ? (
            <FontAwesomeIcon icon={faClock} size={24} color={COLORS.WHITE} />
        ) : (
            <FontAwesomeIcon icon={faCheck} size={24} color={COLORS.WHITE} />
        )}
    </Container>
  );
}