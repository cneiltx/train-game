import { Box, Typography } from "@mui/material";

export interface GameControlsProps {
  extraProps?: any;
}

export const GameControls = (props: GameControlsProps) => {
  return (
    <Box padding='1.5vh' {...props.extraProps} textAlign='center' flexShrink={0} >
      <Typography variant='body1'>Hello World</Typography>
    </Box>
  );
}