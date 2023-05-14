import { Box, Fade, Stack } from '@mui/material';
import { TrainCard } from '../model/TrainCard';
import { TrainDeckCard } from './TrainDeckCard';
import { GameController } from '../controllers/GameController';
import { useEffect, useState } from 'react';

export interface LocalTrainCardStackProps {
  cards: TrainCard[];
  game: GameController;
  mode: 'playerHand' | 'playerHandSelected';
  extraProps?: any;
}

export const LocalTrainCardStack = (props: LocalTrainCardStackProps) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
  }, []);

  return (
    <Fade in={fade} timeout={750}>
      <Stack key={props.cards[props.cards.length - 1].id} direction='row' {...props.extraProps}>
        <TrainDeckCard key='card' card={props.cards[0]} game={props.game} mode={props.mode} extraProps={{ height: '5vh', width: '7.75vh' }} />
        <Box display='flex' alignItems='center' key={props.cards.length} paddingLeft='1vh' sx={{ font: 'bold 2.5vh roboto', userSelect: 'none' }}>
          {props.cards.length}
        </Box>
      </Stack >
    </Fade>
  );
}