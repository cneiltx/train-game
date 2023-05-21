import { Box } from '@mui/material';
import { DestinationDeckCard } from './DestinationDeckCard';
import { useEffect, useState } from 'react';
import { GameController, PlayerDestinationCardCompleteEventArgs, PlayerDestinationCardsChangeEventArgs } from '../controllers/GameController';

export interface LocalDestinationCardsProps {
  game: GameController;
  extraProps?: any;
}

export const LocalDestinationCards = (props: LocalDestinationCardsProps) => {
  const destinationCards: JSX.Element[] = [];
  const [localPlayerDestinationCards, setLocalPlayerDestinationCards] = useState(props.game.localPlayer?.destinationCards);

  useEffect(() => {
    props.game.addEventListener('onPlayerDestinationCardsChange', (e) => handlePlayerDestinationCardsChange(e));
    return props.game.removeEventListener('onPlayerDestinationCardsChange', handlePlayerDestinationCardsChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerDestinationCardsChange = (e: CustomEventInit<PlayerDestinationCardsChangeEventArgs>) => {
    if (props.game.localPlayer && props.game.localPlayer.name === e.detail!.player.name) {
      setLocalPlayerDestinationCards([...e.detail!.cards]);
    }
  }

  useEffect(() => {
    props.game.addEventListener('onPlayerDestinationCardComplete', (e) => handlePlayerDestinationCardComplete(e));
    return props.game.removeEventListener('onPlayerDestinationCardComplete', handlePlayerDestinationCardComplete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerDestinationCardComplete = (e: CustomEventInit<PlayerDestinationCardCompleteEventArgs>) => {
    if (props.game.localPlayer && props.game.localPlayer.name === e.detail!.player.name) {
      setLocalPlayerDestinationCards([...props.game.localPlayer.destinationCards]);
    }
  }

  const cardsCopy = localPlayerDestinationCards ?? [];
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
        game={props.game}
        mode='playerHand'
        extraProps={{ height: '12vh' }} />
    );
  }

  return (
    <Box display='flex' padding='1.5vh' height='100%' flexGrow={1} {...props.extraProps} sx={{ overflow: 'hidden' }}>
      <Box sx={{ display: 'grid', gridAutoColumns: 'max-content', columnGap: '1vh', gridAutoFlow: 'column', overflowX: 'auto' }} height='100%'>
        {destinationCards}
      </Box>
    </Box>
  );
}