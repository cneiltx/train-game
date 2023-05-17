import { Stack } from '@mui/material';
import { LocalTrainCardStack } from './LocalTrainCardStack';
import { GameController, PlayerTrainCardsChangeEventArgs } from '../controllers/GameController';
import { useEffect, useState } from 'react';
import { TrainCard } from '../model/TrainCard';

export interface LocalTrainCardsProps {
  game: GameController;
  extraProps?: any;
}

export const LocalTrainCards = (props: LocalTrainCardsProps) => {
  const trainCardsByColor: TrainCard[][] = [];
  const [localPlayerTrainCards, setLocalPlayerTrainCards] = useState(props.game.localPlayer?.trainCards);

  useEffect(() => {
    props.game.addEventListener('onPlayerTrainCardsChange', (e) => handlePlayerTrainCardsChange(e));
    return props.game.removeEventListener('onPlayerTrainCardsChange', handlePlayerTrainCardsChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerTrainCardsChange = (e: CustomEventInit<PlayerTrainCardsChangeEventArgs>) => {
    if (props.game.localPlayer?.name === e.detail?.player.name) {
      setLocalPlayerTrainCards([...e.detail!.cards]);
    }
  }

  // TODO: Fix reordering when pushing back selected cards to hand
  // TODO: Fix disappearing cards after claiming route

  for (const card of localPlayerTrainCards ?? []) {
    const index = trainCardsByColor.findIndex((value) => value[0].color === card.color);
    if (index === -1) {
      trainCardsByColor.push([card]);
    } else {
      trainCardsByColor[index].push(card);
    }
  }

  return (
    <Stack direction='row' padding='1.5vh' spacing='3vh' {...props.extraProps}>
      <Stack key={1} direction='column' spacing='1vh'>
        {trainCardsByColor.length > 0 && <LocalTrainCardStack key={trainCardsByColor[0][0].color} cards={trainCardsByColor[0]} mode='playerHand' game={props.game} />}
        {trainCardsByColor.length > 1 && <LocalTrainCardStack key={trainCardsByColor[1][0].color} cards={trainCardsByColor[1]} mode='playerHand' game={props.game} />}
        {trainCardsByColor.length > 2 && <LocalTrainCardStack key={trainCardsByColor[2][0].color} cards={trainCardsByColor[2]} mode='playerHand' game={props.game} />}
      </Stack>
      {trainCardsByColor.length > 3 && <Stack key={2} direction='column' spacing='1vh'>
        {trainCardsByColor.length > 3 && <LocalTrainCardStack key={trainCardsByColor[3][0].color} cards={trainCardsByColor[3]} mode='playerHand' game={props.game} />}
        {trainCardsByColor.length > 4 && <LocalTrainCardStack key={trainCardsByColor[4][0].color} cards={trainCardsByColor[4]} mode='playerHand' game={props.game} />}
        {trainCardsByColor.length > 5 && <LocalTrainCardStack key={trainCardsByColor[5][0].color} cards={trainCardsByColor[5]} mode='playerHand' game={props.game} />}
      </Stack>}
      {trainCardsByColor.length > 6 && <Stack key={3} direction='column' spacing='1vh'>
        {trainCardsByColor.length > 6 && <LocalTrainCardStack key={trainCardsByColor[6][0].color} cards={trainCardsByColor[6]} mode='playerHand' game={props.game} />}
        {trainCardsByColor.length > 7 && <LocalTrainCardStack key={trainCardsByColor[7][0].color} cards={trainCardsByColor[7]} mode='playerHand' game={props.game} />}
        {trainCardsByColor.length > 8 && <LocalTrainCardStack key={trainCardsByColor[8][0].color} cards={trainCardsByColor[8]} mode='playerHand' game={props.game} />}
      </Stack>}
    </Stack>
  );
}