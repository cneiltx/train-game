import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import tileGold from '../images/backgrounds/tile-gold.jpg';

export type GameControlsProps = {
  extraProps?: any;
}

export const GameControls = (props: GameControlsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const referenceWidth = 400;
  const referenceHeight = 200;
  let color = '';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = referenceWidth;
      canvas.height = referenceHeight;
    }

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onResize = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext('2d')!;
      DrawBackground(context);
    }
  }

  const DrawBackground = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, referenceWidth, referenceHeight);
    context.fillStyle = color;
    context.fillRect(0, 0, referenceWidth, referenceHeight * 0.4);
  }

  return (
    <Box style={{ backgroundImage: `url(${tileGold})`, backgroundRepeat: 'repeat' }} boxShadow='inset 0 0 5px 2px gold' padding='1.5vh' {...props.extraProps} textAlign='center' ref={boxRef} >
      <Box component='canvas' ref={canvasRef} sx={{ height: '100%' }} />
    </Box>
  );
}