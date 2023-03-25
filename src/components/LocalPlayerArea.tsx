import { Stack } from '@mui/material';
import { EnumFunctions } from '../model/EnumFunctions';
import { Player } from '../model/Player';
import { TrainCardColor } from '../model/TrainCardColor';
import { DestinationCardStack } from './DestinationCardStack';
import { LocalPlayerSummary } from './LocalPlayerSummary';
import { TrainCardStack } from './TrainCardStack';

export type LocalPlayerAreaProps = {
  player: Player;
  extraProps?: any;
}

export const LocalPlayerArea = (props: LocalPlayerAreaProps) => {
  const trainCardStacks = [];

  for (const color of EnumFunctions.getEnumValues<TrainCardColor>(TrainCardColor)) {
    const cards = props.player.trainCards.filter((card) => { return card.color === color });

    if (cards.length > 0) {
      trainCardStacks.push(<TrainCardStack cards={cards} faceUp={true} rotate={true} showCount={true} extraProps={{ height: '17vh', width: '6.5vw' }} />);
    }
  }

  return (
    <Stack border='solid red' padding='1vh' spacing='1vh' direction='row' justifyContent='space-between' {...props.extraProps}>
      <DestinationCardStack cards={props.player.destinationCards} faceUp={true} rotate={false} extraProps={{ height: '17vh', width: '16vw' }} />
      <Stack spacing='1vh' direction='row' justifyContent='center' height='100%'>
        {trainCardStacks}
      </Stack>
      <LocalPlayerSummary player={props.player} extraProps={{ height: '17vh', width: '14vw' }} />
    </Stack>
  );
}