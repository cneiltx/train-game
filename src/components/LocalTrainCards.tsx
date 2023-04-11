import { Stack } from '@mui/material';
import { TrainCard } from '../model/TrainCard';
import { EnumFunctions } from '../model/EnumFunctions';
import { TrainCardColor } from '../model/TrainCardColor';
import { LocalTrainCardStack } from './LocalTrainCardStack';

export type LocalTrainCardsProps = {
  cards: TrainCard[];
  extraProps?: any;
}

export const LocalTrainCards = (props: LocalTrainCardsProps) => {
  const trainCardsByColor = [];

  for (const color of EnumFunctions.getEnumValues<TrainCardColor>(TrainCardColor)) {
    const cards = props.cards.filter((card) => card.color === color);
    if (cards.length > 0) {
      trainCardsByColor.push(cards);
    }
  }

  return (
    <Stack boxShadow='inset 0 0 0 3px darkblue' direction='row' padding='1.5vh' spacing='3vh' {...props.extraProps}>
      <Stack key={1} direction='column' spacing='1vh'>
        {trainCardsByColor.length > 0 && <LocalTrainCardStack key={trainCardsByColor[0][0].color} cards={trainCardsByColor[0]} />}
        {trainCardsByColor.length > 1 && <LocalTrainCardStack key={trainCardsByColor[1][0].color} cards={trainCardsByColor[1]} />}
        {trainCardsByColor.length > 2 && <LocalTrainCardStack key={trainCardsByColor[2][0].color} cards={trainCardsByColor[2]} />}
      </Stack>
      {trainCardsByColor.length > 3 && <Stack key={2} direction='column' spacing='1vh'>
        {trainCardsByColor.length > 3 && <LocalTrainCardStack key={trainCardsByColor[3][0].color} cards={trainCardsByColor[3]} />}
        {trainCardsByColor.length > 4 && <LocalTrainCardStack key={trainCardsByColor[4][0].color} cards={trainCardsByColor[4]} />}
        {trainCardsByColor.length > 5 && <LocalTrainCardStack key={trainCardsByColor[5][0].color} cards={trainCardsByColor[5]} />}
      </Stack>}
      {trainCardsByColor.length > 6 && <Stack key={3} direction='column' spacing='1vh'>
        {trainCardsByColor.length > 6 && <LocalTrainCardStack key={trainCardsByColor[6][0].color} cards={trainCardsByColor[6]} />}
        {trainCardsByColor.length > 7 && <LocalTrainCardStack key={trainCardsByColor[7][0].color} cards={trainCardsByColor[7]} />}
        {trainCardsByColor.length > 8 && <LocalTrainCardStack key={trainCardsByColor[8][0].color} cards={trainCardsByColor[8]} />}
      </Stack>}
    </Stack>
  );
}