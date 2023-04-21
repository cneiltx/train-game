import { Box } from '@mui/material';
import { DestinationDeckCard } from './DestinationDeckCard';
import { DestinationCard } from '../model/DestinationCard';
import { useEffect, useState } from 'react';
import { GameController } from '../controllers/GameController';

export type LocalDestinationCardsProps = {
  game: GameController;
  onSelectedCardChange?: (card: DestinationCard | null) => void;
  extraProps?: any;
}

export const LocalDestinationCards = (props: LocalDestinationCardsProps) => {
  const destinationCards = [];
  const cardsCopy = [...props.game.localPlayer.destinationCards];
  const [selectedCard, setSelectedCard] = useState<DestinationCard | null>(null);
  const [localPlayerDestinationCards, setLocalPlayerDestinationCards] = useState(props.game.localPlayer.destinationCards);

  useEffect(() => {
    props.game.addEventListener('onActivePlayerDestinationCardsChange', (e) => handleActivePlayerDestinationCardsChange(e));
    return props.game.removeEventListener('onActivePlayerDestinationCardsChange', handleActivePlayerDestinationCardsChange);
  }, [props.game]);

  const handleActivePlayerDestinationCardsChange = (event: CustomEventInit<{ cards: DestinationCard[] }>) => {
    if (props.game.localPlayer === props.game.activePlayer) {
      setLocalPlayerDestinationCards([...event.detail!.cards]);
    }
  }

  const handleCardClick = (card: DestinationCard) => {
    let newSelection: DestinationCard | null;

    if (card.id === selectedCard?.id) {
      newSelection = null;
    } else {
      newSelection = card;
    }

    setSelectedCard(newSelection);

    if (props.onSelectedCardChange) {
      props.onSelectedCardChange(newSelection);
    }
  }

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
      <DestinationDeckCard
        key={card.id}
        card={card}
        cities={props.game.map.cities}
        faceUp={true}
        selected={card.id === selectedCard?.id}
        canClick={true}
        onClick={handleCardClick}
        extraProps={{ height: '12vh' }} />
    );
  }

  return (
    <Box display='flex' boxShadow='inset 3px 0 0 0 darkgoldenrod' padding='1.5vh' height='100%' flexGrow={1} {...props.extraProps} sx={{ overflow: 'hidden' }}>
      <Box sx={{ display: 'grid', gridAutoColumns: 'max-content', columnGap: '1vh', gridAutoFlow: 'column', overflowX: 'auto' }} height='100%'>
        {destinationCards}
      </Box>
    </Box>
  );
}