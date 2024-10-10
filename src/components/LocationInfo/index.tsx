import { IconLookup, IconName, faCar, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { IconBox } from '../IconBox';
import { Container,Info,Label,Description } from './styles';

export type LocationInfoProps = {
  label?:string
  description: string
  initialAddress?:string;
  finalAddress?:string
  icon?: IconLookup | IconName;
}

export function LocationInfo({icon,label,description,initialAddress,finalAddress}:
    LocationInfoProps
) {
  return (
    <Container>
        <IconBox icon={icon}/>
        <Info>
        <Label numberOfLines={1}>
            {label}	
        </Label>
        <Description numberOfLines={1}>
            {description}
        </Description>
        <Label numberOfLines={1}>
            {initialAddress}	
        </Label>
        <Label numberOfLines={1}>
            {finalAddress}	
        </Label>
        </Info>

    </Container>
  );
}