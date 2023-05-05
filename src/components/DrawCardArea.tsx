import { TrainDeckCard } from './TrainDeckCard';
import { Box, Stack } from '@mui/material';
import { TrainCardStack } from './TrainCardStack';
import { DestinationCardStack } from './DestinationCardStack';
import { DestinationCardDeckChangeEventArgs, GameController, PlayerStateChangeEventArgs, TrainCardDeckChangeEventArgs } from '../controllers/GameController';
import { useEffect, useState } from 'react';
import { TrainCard } from '../model/TrainCard';
import { PlayerState } from '../model/PlayerState';
import { DestinationCard } from '../model/DestinationCard';
import { DestinationDeckCard } from './DestinationDeckCard';

export interface DrawCardAreaProps {
  game: GameController;
  extraProps?: any;
}

export const DrawCardArea = (props: DrawCardAreaProps) => {
  const trainCards: JSX.Element[] = [];
  const destinationCards: JSX.Element[] = [];
  const [trainCardDeck, setTrainCardDeck] = useState(props.game.trainCardDeck);
  const [faceUpTrainCards, setFaceUpTrainCards] = useState(props.game.faceUpTrainCards);
  const [destinationCardDeck, setDestinationCardDeck] = useState(props.game.destinationCardDeck);
  const [localPlayerState, setLocalPlayerState] = useState(props.game.localPlayer?.state);
  const [drawnDestinationCards, setDrawnDestinationCards] = useState<DestinationCard[]>([]);
  const [selectedDestinationCards, setSelectedDestinationCards] = useState<DestinationCard[]>([]);

  useEffect(() => {
    props.game.addEventListener('onTrainCardDeckChange', (e) => handleTrainCardDeckChange(e));
    return props.game.removeEventListener('onTrainCardDeckChange', handleTrainCardDeckChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.game.addEventListener('onFaceUpTrainCardsChange', (e) => handleFaceUpTrainCardsChange(e));
    return props.game.removeEventListener('onFaceUpTrainCardsChange', handleFaceUpTrainCardsChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.game.addEventListener('onDestinationCardDeckChange', (e) => handleDestinationCardDeckChange(e));
    return props.game.removeEventListener('onDestinationCardDeckChange', handleDestinationCardDeckChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.game.addEventListener('onPlayerStateChange', (e) => handlePlayerStateChange(e));
    return props.game.removeEventListener('onPlayerStateChange', handlePlayerStateChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTrainCardDeckChange = (e: CustomEventInit<TrainCardDeckChangeEventArgs>) => {
    setTrainCardDeck(e.detail!.cards);
  }

  const handleFaceUpTrainCardsChange = (e: CustomEventInit<{ cards: TrainCard[] }>) => {
    setFaceUpTrainCards([...e.detail!.cards]);
  }

  const handleDestinationCardDeckChange = (e: CustomEventInit<DestinationCardDeckChangeEventArgs>) => {
    setDestinationCardDeck(e.detail!.cards);
  }

  const handlePlayerStateChange = (e: CustomEventInit<PlayerStateChangeEventArgs>) => {
    if (e.detail!.player.name === props.game.localPlayer?.name) {
      setLocalPlayerState(e.detail!.state);
    }
  }

  const handleDestinationDeckClick = (cards: DestinationCard[]) => {
    const drawnCards = props.game.drawDestinationCards();
    setDrawnDestinationCards(drawnCards);
  }

  const handleDrawnDestinationCardClick = (card: DestinationCard) => {
    const selectedIndex = selectedDestinationCards.findIndex(value => value.id === card.id);

    if (selectedIndex >= 0) {
      selectedDestinationCards.splice(selectedIndex, 1);
    } else {
      selectedDestinationCards.push(card);
    }

    setSelectedDestinationCards([...selectedDestinationCards]);
  }

  let index = 0;
  for (const card of faceUpTrainCards) {
    if (card) {
      trainCards.push(
        <TrainDeckCard
          key={card.id}
          card={card}
          game={props.game}
          mode='drawFaceUp'
          extraProps={{ height: '9vh', width: '14vh' }} />
      );
    } else {
      trainCards.push(<Box key={`empty-${index}`} height='9vh' width='14vh' style={{ background: 'rgba(255, 255, 255, 0.2)', borderRadius: '10%' }} />);
    }
    index++;
  }

  for (const card of drawnDestinationCards) {
    destinationCards.push(
      <DestinationDeckCard
        key={card.id}
        card={card}
        faceUp={true}
        cities={props.game.map.cities}
        canClick={true}
        onClick={(card) => handleDrawnDestinationCardClick(card)}
        selected={selectedDestinationCards.findIndex(value => value.id === card.id) >= 0}
        extraProps={{ height: '9vh', width: '14vh' }} />
    );
  }

  return (
    localPlayerState === PlayerState.DrawingDestinationCards ?
      <Stack padding='1.5vh' spacing='1.5vh' alignItems='center' {...props.extraProps}>
        {destinationCards}
      </Stack> :
      <Stack padding='1.5vh' spacing='1.5vh' alignItems='center' {...props.extraProps}>
        <TrainCardStack
          key='trainDeck'
          cards={trainCardDeck}
          game={props.game}
          extraProps={{ height: '9vh', width: '14vh' }} />
        {trainCards}
        <DestinationCardStack
          key='destinationDeck'
          cards={destinationCardDeck}
          cities={props.game.map.cities}
          faceUp={false}
          canClick={localPlayerState === PlayerState.StartingTurn}
          onClick={handleDestinationDeckClick}
          extraProps={{ height: '9vh', width: '14vh' }} />
      </Stack>
  );
}