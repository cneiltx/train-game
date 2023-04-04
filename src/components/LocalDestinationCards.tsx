import { Box } from '@mui/material';
import { DestinationDeckCard } from './DestinationDeckCard';
import { DestinationCard } from '../model/DestinationCard';

// TODO: add click handlers to train and destination cards
export type LocalDestinationCardsProps = {
  cards: DestinationCard[];
  extraProps?: any;
}

export const LocalDestinationCards = (props: LocalDestinationCardsProps) => {
  const destinationCards = [];
  const cardsCopy = [...props.cards];

  cardsCopy.sort((card1, card2) => {
    if (card1.complete && !card2.complete) {
      return 1;
    } else if (!card1.complete && card2.complete) {
      return -1;
    } else {
      return 0;
    }
  });

  for (const card of cardsCopy) {
    destinationCards.push(
      <DestinationDeckCard card={card} faceUp={true} extraProps={{ height: '12vh' }} />
    );
  }

  return (
    <Box boxShadow='inset 0 0 0 3px darkblue' padding='1.5vh' height='100%' width='100%' {...props.extraProps} sx={{ overflow: 'clip' }}>
      <Box sx={{ display: 'grid', gridAutoColumns: 'max-content', columnGap: '1vh', gridAutoFlow: 'column', overflow: 'auto' }} height='100%' width='100%'>
        {destinationCards}
      </Box>
    </Box>
  );
}