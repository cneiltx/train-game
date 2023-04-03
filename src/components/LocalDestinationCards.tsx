import { Stack } from '@mui/material';
import { DestinationDeckCard } from './DestinationDeckCard';
import { DestinationCard } from '../model/DestinationCard';

export type LocalDestinationCardsProps = {
  cards: DestinationCard[];
  extraProps?: any;
}

export const LocalDestinationCards = (props: LocalDestinationCardsProps) => {
  const destinationCards = [];

  for (const card of props.cards) {
    destinationCards.push(
      <DestinationDeckCard card={card} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />
    );
  }

  // TODO: If > 7, divide in half
  // TODO: Color code destination cards to show completion
  return (
    <Stack boxShadow='inset 0 0 0 3px darkblue' direction='column' padding='1.5vh' spacing='1.5vh' height='100%' width='100%' {...props.extraProps}>
      <Stack direction='row' spacing='1vh' height={props.cards.length > 7 ? '7.75vh' : '100%'} width='100%'>
        {props.cards.length > 0 && <DestinationDeckCard card={props.cards[0]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
        {props.cards.length > 1 && <DestinationDeckCard card={props.cards[1]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
        {props.cards.length > 2 && <DestinationDeckCard card={props.cards[2]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
        {props.cards.length > 3 && <DestinationDeckCard card={props.cards[3]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
        {props.cards.length > 4 && <DestinationDeckCard card={props.cards[4]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
        {props.cards.length > 5 && <DestinationDeckCard card={props.cards[5]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
        {props.cards.length > 6 && <DestinationDeckCard card={props.cards[6]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
      </Stack>
      {props.cards.length > 7 && <Stack direction='row' spacing='1vh' height='7.75vh' width='100%'>
        {props.cards.length > 7 && <DestinationDeckCard card={props.cards[7]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
        {props.cards.length > 8 && <DestinationDeckCard card={props.cards[8]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
        {props.cards.length > 9 && <DestinationDeckCard card={props.cards[9]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
        {props.cards.length > 10 && <DestinationDeckCard card={props.cards[10]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
        {props.cards.length > 11 && <DestinationDeckCard card={props.cards[11]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
        {props.cards.length > 12 && <DestinationDeckCard card={props.cards[12]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
        {props.cards.length > 13 && <DestinationDeckCard card={props.cards[13]} faceUp={true} extraProps={{ width: '100%', height: '100%' }} />}
      </Stack>}
    </Stack>
  );
}