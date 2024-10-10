import { faCar, faFlagCheckered, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { LocationInfo, LocationInfoProps } from "../LocationInfo";
import {Container,Line} from "./styles";

type Props= {
    departure:LocationInfoProps;
    arrival?:LocationInfoProps | null;
}

export function Locations({departure,arrival= null}:Props) {
  return (
    <Container>
        <LocationInfo
            icon={faMotorcycle}
            description={departure.description}
            initialAddress={departure.initialAddress}
         />
         
        <Line />
        {
            arrival &&
            <>
            <LocationInfo   
                description={arrival.description}
                icon={faFlagCheckered}
                label={arrival.label}
                finalAddress={arrival.finalAddress}
            />
            </>
        }
          </Container>
  )};