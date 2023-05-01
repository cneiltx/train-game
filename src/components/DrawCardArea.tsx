import { TrainDeckCard } from './TrainDeckCard';
import { Box, Stack } from '@mui/material';
import { TrainCardStack } from './TrainCardStack';
import { DestinationCardStack } from './DestinationCardStack';
import { GameController, PlayerStateChangeEventArgs } from '../controllers/GameController';
import { useEffect, useState } from 'react';
import { TrainCard } from '../model/TrainCard';
import { PlayerState } from '../model/PlayerState';

export interface DrawCardAreaProps {
  game: GameController;
  extraProps?: any;
}

export const DrawCardArea = (props: DrawCardAreaProps) => {
  const cards = [];
  const [faceUpTrainCards, setFaceUpTrainCards] = useState(props.game.faceUpTrainCards);
  const [isLocalPlayerActive, setIsLocalPlayerActive] = useState(props.game.localPlayer ? props.game.localPlayer.state !== PlayerState.Waiting : false);

  useEffect(() => {
    props.game.addEventListener('onFaceUpTrainCardsChange', (e) => handleFaceUpTrainCardsChange(e));
    return props.game.removeEventListener('onFaceUpTrainCardsChange', handleFaceUpTrainCardsChange);
  }, [props.game]);

  useEffect(() => {
    props.game.addEventListener('onPlayerStateChange', (e) => handlePlayerStateChange(e));
    return props.game.removeEventListener('onPlayerStateChange', handlePlayerStateChange);
  }, [props.game]);

  const handleFaceUpTrainCardsChange = (e: CustomEventInit<{ cards: TrainCard[] }>) => {
    setFaceUpTrainCards([...e.detail!.cards]);
  }

  const handlePlayerStateChange = (e: CustomEventInit<PlayerStateChangeEventArgs>) => {
    setIsLocalPlayerActive(props.game.localPlayer ?
      e.detail!.player.name === props.game.localPlayer.name && e.detail!.state !== PlayerState.Waiting : false);
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
        canClick={isLocalPlayerActive}
        onClick={() => { }}
        extraProps={{ height: '9vh', width: '14vh' }} />
    </Stack>
  );
}