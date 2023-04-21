import { TrainDeckCard } from './TrainDeckCard';
import { Box, Stack } from '@mui/material';
import { TrainCardStack } from './TrainCardStack';
import { DestinationCardStack } from './DestinationCardStack';
import { GameController } from '../controllers/GameController';
import { useEffect, useState } from 'react';
import { TrainCard } from '../model/TrainCard';

export interface DrawCardAreaProps {
  game: GameController;
  extraProps?: any;
}

export const DrawCardArea = (props: DrawCardAreaProps) => {
  const cards = [];
  const [faceUpTrainCards, setFaceUpTrainCards] = useState(props.game.faceUpTrainCards);

  useEffect(() => {
    props.game.addEventListener('onFaceUpTrainCardsChange', (e) => handleFaceUpTrainCardsChange(e));
    return props.game.removeEventListener('onFaceUpTrainCardsChange', handleFaceUpTrainCardsChange);
  }, [props.game]);

  const handleFaceUpTrainCardsChange = (event: CustomEventInit<{ cards: TrainCard[] }>) => {
    setFaceUpTrainCards([...event.detail!.cards]);
  }

  let index = 0;
  for (const card of faceUpTrainCards) {
    if (card) {
      cards.push(
        <TrainDeckCard
          key={card.id}
          card={card}
          game={props.game}
          mode='drawFaceUp'
          extraProps={{ height: '9vh', width: '14vh' }} />
      );
    } else {
      cards.push(<Box key={`empty-${index}`} height='9vh' width='14vh' style={{ background: 'rgba(255, 255, 255, 0.2)', borderRadius: '10%' }} />);
    }
    index++;
  }

  return (
    <Stack padding='1.5vh' spacing='1.5vh' alignItems='center' {...props.extraProps}>
      <TrainCardStack
        key='trainDeck'
        cards={props.game.trainCardDeck}
        game={props.game}
        extraProps={{ height: '9vh', width: '14vh' }} />
      {cards}
      <DestinationCardStack
        key='destinationDeck'
        cards={props.game.destinationCardDeck}
        cities={props.game.map.cities}
        faceUp={false}
        canClick={props.game.activePlayer.name === props.game.localPlayer.name}
        onClick={() => { }}
        extraProps={{ height: '9vh', width: '14vh' }} />
    </Stack>
  );
}