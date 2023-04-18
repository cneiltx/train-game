import { TrainDeckCard } from './TrainDeckCard';
import { Box, Stack } from '@mui/material';
import { TrainCardStack } from './TrainCardStack';
import { DestinationCardStack } from './DestinationCardStack';
import { GameController } from '../controllers/GameController';
import { useEffect, useState } from 'react';
import { TrainCard } from '../model/TrainCard';

export type DrawCardAreaProps = {
  game: GameController;
  extraProps?: any;
}

export const DrawCardArea = (props: DrawCardAreaProps) => {
  const cards = [];
  const [faceUpTrainCards, setFaceUpTrainCards] = useState(props.game.faceUpTrainCards);

  useEffect(() => {
    props.game.addEventListener('onFaceUpTrainCardsChange', (e) => handleFaceUpTrainCardsChange(e));
    return props.game.removeEventListener('onFaceUpTrainCardsChange', handleFaceUpTrainCardsChange);
  }, []);

  const handleFaceUpTrainCardsChange = (event: CustomEventInit<{ cards: TrainCard[] }>) => {
    setFaceUpTrainCards([...event.detail!.cards]);
  }

  for (const card of faceUpTrainCards) {
    if (card) {
      cards.push(
        <TrainDeckCard
          key={card.id}
          card={card}
          faceUp={true}
          canClick={props.game.activePlayer.name === props.game.localPlayer.name}
          onClick={(card) => props.game.drawFaceUpTrainCard(card)}
          extraProps={{ height: '9vh', width: '14vh' }} />
      );
    } else {
      cards.push(<Box key={-1} height='9vh' />);
    }
  }

  return (
    <Stack boxShadow='inset 0 0 0 3px darkblue' padding='1.5vh' spacing='1.5vh' alignItems='center' {...props.extraProps}>
      <TrainCardStack
        key='trainDeck'
        cards={props.game.trainCardDeck}
        faceUp={false}
        canClick={props.game.activePlayer.name === props.game.localPlayer.name}
        onClick={() => props.game.drawTrainCardFromDeck()}
        extraProps={{ height: '9vh', width: '14vh' }} />
      {cards}
      <DestinationCardStack
        key='destinationDeck'
        cards={props.game.destinationCardDeck}
        cities={props.game.map.cities}
        faceUp={false}
        canClick={props.game.activePlayer.name === props.game.localPlayer.name}
        onClick={() => { }}
        extraProps={{ height: '9vh' }} />
    </Stack>
  );
}