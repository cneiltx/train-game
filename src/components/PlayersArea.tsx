import { Stack } from "@mui/material";
import { TrainCardColor } from "../model/TrainCardColor";
import { TrainDeckCard } from "./TrainDeckCard";

export type PlayersAreaProps = {
  extraProps?: any;
}

export const PlayersArea = (props: PlayersAreaProps) => {
  return (
    <Stack border='solid red' height='100%' padding={1} spacing={1} alignItems='flex-start' {...props.extraProps}>
      <TrainDeckCard color={TrainCardColor.Red} faceUp={false} extraProps={{ height: '15%' }} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} extraProps={{ height: '15%' }} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} extraProps={{ height: '15%' }} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} extraProps={{ height: '15%' }} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} extraProps={{ height: '15%' }} />
      <TrainDeckCard color={TrainCardColor.Red} faceUp={true} extraProps={{ height: '15%' }} />
    </Stack>
  );
}