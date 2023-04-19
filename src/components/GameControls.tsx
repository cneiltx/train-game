import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

export interface GameControlsProps {
  extraProps?: any;
}

export const GameControls = (props: GameControlsProps) => {
  return (
    <Box boxShadow='inset 0 0 0 3px darkblue' padding='1.5vh' {...props.extraProps} textAlign='center' >
    </Box>
  );
}