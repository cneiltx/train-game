import cardBack from '../images/destination-cards/card-back.png';
import cardFront from '../images/destination-cards/card-front.png';
import { Box } from "@mui/material";
import { USCities } from '../model/USCities';
import { useEffect, useRef } from 'react';

export type DestinationDeckCardProps = {
  city1: USCities;
  city2: USCities;
  value: number;
  faceUp: boolean;
  rotate?: boolean;
  extraProps?: any;
}

export const DestinationDeckCard = (props: DestinationDeckCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const image = new Image();
  const cityMap = getCityMap();

  useEffect(() => {
    if (props.faceUp) {
      image.src = cardFront;
    } else {
      image.src = cardBack;
    }

    window.addEventListener('resize', onResize);

    image.onload = () => {
      onResize();
    }
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onResize = () => {
    const canvas = canvasRef.current!;
    canvas.height = canvas.clientHeight;

    if (props.rotate) {
      canvas.width = canvas.clientHeight * image.height / image.width;
      drawCard(canvas.clientHeight / image.width);
    } else {
      canvas.width = canvas.clientHeight * image.width / image.height;
      drawCard(canvas.clientHeight / image.height);
    }
  }

  const drawCard = (scale: number) => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height / 2);
    if (props.rotate) {
      context.rotate(-90 * Math.PI / 180);
    }
    context.scale(scale, scale);
    context.drawImage(image, -image.width / 2, -image.height / 2);
    context.restore();
    context.scale(scale, scale);
    drawTitle(context);
    drawValue(context);
    drawRoute(context);
    drawCities(context);
    context.restore();
  }

  const drawCities = (context: CanvasRenderingContext2D) => {
    const cityRadius = 1.1;
    context.fillStyle = 'indianred';
    getCityMap().forEach((coordinate) => {
      context.beginPath();
      let [x, y] = [coordinate.x, coordinate.y];
      if (props.rotate) {
        [x, y] = [y, image.width - x];
      }
      context.arc(x, y, cityRadius, 0, 2 * Math.PI);
      context.fill();
    })
  }

  const drawTitle = (context: CanvasRenderingContext2D) => {
    const fontSize = 11;
    let [x, y] = [125, 27];
    context.save();
    if (props.rotate) {
      context.translate(y, image.width - x);
      context.rotate(-Math.PI / 2);
      [x, y] = [0, 0];
    }
    context.font = `bold ${fontSize}px system-ui`;
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const text = 'Billings - Atlanta';
    context.fillText(text, x, y);
    context.restore();
  }

  const drawValue = (context: CanvasRenderingContext2D) => {
    const fontSize = 30;
    let [x, y] = [211, 125];
    context.save();
    if (props.rotate) {
      context.translate(y, image.width - x);
      context.rotate(-Math.PI / 2);
      [x, y] = [0, 0];
    }
    context.font = `bold ${fontSize}px system-ui`;
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const text = props.value.toString();
    context.fillText(text, x, y);
    context.restore();
  }

  const drawRoute = (context: CanvasRenderingContext2D) => {
    const city1Coords = cityMap.get(props.city1)!;
    const city2Coords = cityMap.get(props.city2)!;
    let [x1, y1] = [city1Coords.x, city1Coords.y];
    let [x2, y2] = [city2Coords.x, city2Coords.y];
    if (props.rotate) {
      [x1, y1] = [y1, image.width - x1];
      [x2, y2] = [y2, image.width - x2];
    }
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = 'darkgoldenrod';
    context.lineWidth = 3;
    context.stroke();
    drawCityRing(context, props.city1);
    drawCityRing(context, props.city2);
  }

  const drawCityRing = (context: CanvasRenderingContext2D, city: USCities) => {
    const cityInnerRadius = 2;
    const cityOuterRadius = 7;
    context.fillStyle = 'navy';
    getCityMap().forEach((coordinate) => {
      context.beginPath();
      const coordinates = cityMap.get(city)!;
      let [x, y] = [coordinates.x, coordinates.y];
      if (props.rotate) {
        [x, y] = [y, image.width - x];
      }
      context.arc(x, y, cityInnerRadius, 0, 2 * Math.PI, true);
      context.arc(x, y, cityOuterRadius, 0, 2 * Math.PI, false);
      context.fill();
    })
  }

  function getCityMap(): Map<USCities, { x: number, y: number }> {
    const map = new Map<USCities, { x: number, y: number }>();
    map.set(USCities.Atlanta, { x: 156, y: 109 });
    map.set(USCities.Billings, { x: 79, y: 62 });
    map.set(USCities.Boston, { x: 188, y: 66 });
    map.set(USCities.Calgary, { x: 66, y: 40 });
    map.set(USCities.Charleston, { x: 173, y: 108 });
    map.set(USCities.Chicago, { x: 139, y: 78 });
    map.set(USCities.Dallas, { x: 112, y: 118 });
    map.set(USCities.Denver, { x: 87, y: 88 });
    map.set(USCities.ElPaso, { x: 81, y: 120 });
    map.set(USCities.Houston, { x: 115, y: 128 });
    map.set(USCities.KansasCity, { x: 117, y: 91 });
    map.set(USCities.LasVegas, { x: 52, y: 97 });
    map.set(USCities.LittleRock, { x: 128, y: 109 });
    map.set(USCities.LosAngeles, { x: 36, y: 102 });
    map.set(USCities.Miami, { x: 176, y: 137 });
    map.set(USCities.Minneapolis, { x: 122, y: 68 });
    map.set(USCities.Montreal, { x: 176, y: 55 });
    map.set(USCities.Nashville, { x: 145, y: 102 });
    map.set(USCities.NewOrleans, { x: 138, y: 127 });
    map.set(USCities.NewYork, { x: 182, y: 73 });
    map.set(USCities.OklahomaCity, { x: 110, y: 106 });
    map.set(USCities.Omaha, { x: 113, y: 82 });
    map.set(USCities.Phoenix, { x: 60, y: 109 });
    map.set(USCities.Pittsburgh, { x: 165, y: 80 });
    map.set(USCities.Portland, { x: 37, y: 57 });
    map.set(USCities.Raleigh, { x: 174, y: 98 });
    map.set(USCities.SaintLouis, { x: 131, y: 93 });
    map.set(USCities.SaltLakeCity, { x: 63, y: 82 });
    map.set(USCities.SanFrancisco, { x: 30, y: 88 });
    map.set(USCities.SantaFe, { x: 81, y: 104 });
    map.set(USCities.SaultSteMarie, { x: 148, y: 59 });
    map.set(USCities.Seattle, { x: 41, y: 49 });
    map.set(USCities.Toronto, { x: 165, y: 66 });
    map.set(USCities.Vancouver, { x: 41, y: 41 });
    map.set(USCities.Washington, { x: 175, y: 84 });
    map.set(USCities.Winnipeg, { x: 109, y: 47 });
    return map;
  }

  return <Box component='canvas' ref={canvasRef} {...props.extraProps} />;
}