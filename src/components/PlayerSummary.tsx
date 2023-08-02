import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Player } from "../model/Player";
import { TrainColor } from "../model/TrainColor";
import destinationCardBack from "../images/destination-cards/card-back.png";
import trainCardBack from "../images/train-cards/card-back.png";
import blackCar from "../images/train-cars/car-black.png";
import blueCar from "../images/train-cars/car-blue.png";
import greenCar from "../images/train-cars/car-green.png";
import redCar from "../images/train-cars/car-red.png";
import yellowCar from "../images/train-cars/car-yellow.png";
import { EnumFunctions } from "../model/EnumFunctions";
import { PlayerStateChangeEventArgs, GameController, PlayerTrainCardsChangeEventArgs, PlayerDestinationCardsChangeEventArgs, PlayerTrainsChangeEventArgs, PlayerScoreChangeEventArgs } from "../controllers/GameController";
import { PlayerState } from "../model/PlayerState";

export interface PlayerSummaryProps {
  game: GameController;
  player: Player;
  extraProps?: any;
}

export const PlayerSummary = (props: PlayerSummaryProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const avatarImage = new Image();
  const trainCardImage = new Image();
  const destinationCardImage = new Image();
  const trainCar = new Image();
  const referenceWidth = 300;
  const referenceHeight = 150;
  const [state, setState] = useState(props.player.state);
  const [trainCards, setTrainCards] = useState(props.player.trainCards);
  const [destinationCards, setDestinationCards] = useState(props.player.destinationCards);
  const [trains, setTrains] = useState(props.player.trains);
  const [score, setScore] = useState(props.player.score);

  useEffect(() => {
    props.game.addEventListener("onPlayerStateChange", (e) => handlePlayerStateChange(e));
    return props.game.removeEventListener("onPlayerStateChange", handlePlayerStateChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerStateChange = (e: CustomEventInit<PlayerStateChangeEventArgs>) => {
    if (e.detail!.player.name === props.player.name) {
      setState(e.detail!.state);
    }
  }

  useEffect(() => {
    props.game.addEventListener("onPlayerTrainCardsChange", (e) => handlePlayerTrainCardsChange(e));
    return props.game.removeEventListener("onPlayerTrainCardsChange", handlePlayerTrainCardsChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerTrainCardsChange = (e: CustomEventInit<PlayerTrainCardsChangeEventArgs>) => {
    if (e.detail!.player.name === props.player.name) {
      setTrainCards([...e.detail!.cards]);
      drawPlayerSummary();
    }
  }

  useEffect(() => {
    props.game.addEventListener("onPlayerDestinationCardsChange", (e) => handlePlayerDestinationCardsChange(e));
    return props.game.removeEventListener("onPlayerDestinationCardsChange", handlePlayerDestinationCardsChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerDestinationCardsChange = (e: CustomEventInit<PlayerDestinationCardsChangeEventArgs>) => {
    if (e.detail!.player.name === props.player.name) {
      setDestinationCards([...e.detail!.cards]);
      drawPlayerSummary();
    }
  }

  useEffect(() => {
    props.game.addEventListener("onPlayerTrainsChange", (e) => handlePlayerTrainsChange(e));
    return props.game.removeEventListener("onPlayerTrainsChange", handlePlayerTrainsChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerTrainsChange = (e: CustomEventInit<PlayerTrainsChangeEventArgs>) => {
    if (e.detail!.player.name === props.player.name) {
      setTrains(e.detail!.trains);
      drawPlayerSummary();
    }
  }

  useEffect(() => {
    props.game.addEventListener("onPlayerScoreChange", (e) => handlePlayerScoreChange(e));
    return props.game.removeEventListener("onPlayerScoreChange", handlePlayerScoreChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerScoreChange = (e: CustomEventInit<PlayerScoreChangeEventArgs>) => {
    if (e.detail!.player.name === props.player.name) {
      setScore(e.detail!.score);
      drawPlayerSummary();
    }
  }

  useEffect(() => {
    avatarImage.src = props.player.avatarImageSrc;
    destinationCardImage.src = destinationCardBack;
    trainCardImage.src = trainCardBack;

    switch (props.player.color) {
      case TrainColor.Black:
        trainCar.src = blackCar;
        break;
      case TrainColor.Blue:
        trainCar.src = blueCar;
        break;
      case TrainColor.Green:
        trainCar.src = greenCar;
        break;
      case TrainColor.Red:
        trainCar.src = redCar;
        break;
      case TrainColor.Yellow:
        trainCar.src = yellowCar;
        break;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = referenceWidth;
      canvas.height = referenceHeight;
    }

    window.addEventListener("resize", drawPlayerSummary);

    avatarImage.onload = () => {
      drawPlayerSummary();
    }
    trainCardImage.onload = () => {
      drawPlayerSummary();
    }
    destinationCardImage.onload = () => {
      drawPlayerSummary();
    }
    trainCar.onload = () => {
      drawPlayerSummary();
    }

    return () => window.removeEventListener("resize", drawPlayerSummary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainCards, destinationCards, trains, score]);

  const drawPlayerSummary = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d")!;
      drawBackground(context);
      drawAvatar(context);
      drawName(context);
      drawScore(context);
      drawTrainCount(context);
      drawTrainCardCount(context);
      drawDestinationCardCount(context);
    }
  }

  const drawBackground = (context: CanvasRenderingContext2D) => {
    context.fillStyle = "#203030";
    context.fillRect(0, 0, referenceWidth, referenceHeight);
    context.fillStyle = EnumFunctions.getHtmlColor(props.player.color);
    context.fillRect(0, 0, referenceWidth, referenceHeight * 0.4);
  }

  const drawAvatar = (context: CanvasRenderingContext2D) => {
    context.save();
    context.beginPath();
    context.arc(referenceHeight * 0.5, referenceHeight * 0.5, referenceHeight * 0.4, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(avatarImage, referenceHeight * 0.1, referenceHeight * 0.1, referenceHeight * 0.8, referenceHeight * 0.8);
    context.restore();
  }

  const drawName = (context: CanvasRenderingContext2D) => {
    context.font = "1.5em roboto";
    context.fillStyle = "white";
    context.textAlign = "left";
    context.textBaseline = "middle";
    const x = referenceHeight * 0.95;
    const padding = referenceWidth * 0.02;
    const line1 = props.player.name.trim().split(" ");
    const line2: string[] = [];

    while (line1.length > 1 && context.measureText(line1.join(" ")).width > referenceWidth - x - padding) {
      line2.unshift(line1.pop()!);
    }

    if (line2.length > 0) {
      context.fillText(line1.join(" "), x, referenceHeight * 0.12);
      context.fillText(line2.join(" "), x, referenceHeight * 0.29);
    } else {
      context.fillText(line1.join(" "), x, referenceHeight * 0.21);
    }
  }

  const drawScore = (context: CanvasRenderingContext2D) => {
    context.fillStyle = EnumFunctions.getHtmlColor(props.player.color);
    context.beginPath();
    context.roundRect(referenceHeight * 0.25, referenceHeight * 0.75, referenceHeight * 0.5, referenceHeight * 0.25, referenceHeight * 0.08);
    context.fill();
    context.fillStyle = "white";
    context.font = "bold 1.5em roboto";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(score.toString(), referenceHeight * 0.5, referenceHeight * 0.89);
  }

  const drawTrainCount = (context: CanvasRenderingContext2D) => {
    context.strokeStyle = EnumFunctions.getHtmlColor(props.player.color);
    context.fillStyle = "white";
    context.lineWidth = 4;
    context.beginPath();
    context.arc(referenceHeight, referenceHeight * 0.75, referenceHeight * 0.2, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.drawImage(trainCar, referenceHeight * 0.85, referenceHeight * 0.63);
    context.fillStyle = "black";
    context.font = "bold 1.2em roboto";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(trains.toString(), referenceHeight, referenceHeight * 0.84);
  }

  const drawTrainCardCount = (context: CanvasRenderingContext2D) => {
    context.drawImage(trainCardImage, referenceHeight * 1.35, referenceHeight * 0.475, referenceHeight * 0.2 * trainCardImage.width / trainCardImage.height, referenceHeight * 0.2);
    context.fillStyle = "white";
    context.font = "bold 1.2em roboto";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillText(trainCards.length.toString(), referenceHeight * 1.72, referenceHeight * 0.58);
  }

  const drawDestinationCardCount = (context: CanvasRenderingContext2D) => {
    context.drawImage(destinationCardImage, referenceHeight * 1.35, referenceHeight * 0.725, referenceHeight * 0.2 * destinationCardImage.width / destinationCardImage.height, referenceHeight * 0.2);
    context.fillStyle = "white";
    context.font = "bold 1.2em roboto";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillText(destinationCards.length.toString(), referenceHeight * 1.72, referenceHeight * 0.835);
  }

  const glow: any = {};
  if (state !== PlayerState.Waiting) {
    glow["boxShadow"] = "0 0 4px 3px gold";
  }

  return (
    <Box {...props.extraProps} {...glow} component="canvas" ref={canvasRef} />
  );
}