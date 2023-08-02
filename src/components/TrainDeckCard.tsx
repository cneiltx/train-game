import blackCard from "../images/train-cards/card-black.png";
import blueCard from "../images/train-cards/card-blue.png";
import greenCard from "../images/train-cards/card-green.png";
import orangeCard from "../images/train-cards/card-orange.png";
import purpleCard from "../images/train-cards/card-purple.png";
import rainbowCard from "../images/train-cards/card-rainbow.png";
import redCard from "../images/train-cards/card-red.png";
import whiteCard from "../images/train-cards/card-white.png";
import yellowCard from "../images/train-cards/card-yellow.png";
import cardBack from "../images/train-cards/card-back.png";
import { TrainCardColor } from "../model/TrainCardColor";
import { Box, Fade } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TrainCard } from "../model/TrainCard";
import { GameController, LocalSelectedRouteChangeEventArgs, PlayerStateChangeEventArgs } from "../controllers/GameController";
import { PlayerState } from "../model/PlayerState";

export interface TrainDeckCardProps {
  card: TrainCard;
  game: GameController;
  mode: "drawDeck" | "drawFaceUp" | "playerHand" | "playerHandSelected";
  extraProps?: any;
}

export const TrainDeckCard = (props: TrainDeckCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const image = new Image();
  const [fade, setFade] = useState(false);
  const [localPlayerState, setLocalPlayerState] = useState(props.game.localPlayer?.state);
  const [selectedRoute, setSelectedRoute] = useState(props.game.localSelectedRoute);

  useEffect(() => {
    setFade(true);
  }, []);

  useEffect(() => {
    props.game.addEventListener("onPlayerStateChange", (e) => handlePlayerStateChange(e));
    return props.game.removeEventListener("onPlayerStateChange", handlePlayerStateChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerStateChange = (e: CustomEventInit<PlayerStateChangeEventArgs>) => {
    if (e.detail!.player.name === props.game.localPlayer?.name) {
      setLocalPlayerState(e.detail!.state);
    }
  }

  useEffect(() => {
    props.game.addEventListener("onLocalSelectedRouteChange", (e) => handleLocalSelectedRouteChange(e));
    return props.game.removeEventListener("onLocalSelectedRouteChange", handleLocalSelectedRouteChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocalSelectedRouteChange = (e: CustomEventInit<LocalSelectedRouteChangeEventArgs>) => {
    setSelectedRoute(e.detail!.route);
  }

  useEffect(() => {
    if (props.mode !== "drawDeck") {
      switch (props.card.color) {
        case TrainCardColor.Black:
          image.src = blackCard;
          break;
        case TrainCardColor.Blue:
          image.src = blueCard;
          break;
        case TrainCardColor.Green:
          image.src = greenCard;
          break;
        case TrainCardColor.Orange:
          image.src = orangeCard;
          break;
        case TrainCardColor.Purple:
          image.src = purpleCard;
          break;
        case TrainCardColor.Wild:
          image.src = rainbowCard;
          break;
        case TrainCardColor.Red:
          image.src = redCard;
          break;
        case TrainCardColor.White:
          image.src = whiteCard;
          break;
        case TrainCardColor.Yellow:
          image.src = yellowCard;
          break;
      }
    } else {
      image.src = cardBack;
    }

    window.addEventListener("resize", onResize);

    image.onload = () => {
      const canvas = canvasRef.current;

      if (canvas) {
        canvas.height = image.height;
        canvas.width = image.width;
        onResize();
      }
    }
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResize = () => {
    const canvas = canvasRef.current!;

    if (canvas) {
      const context = canvas.getContext("2d")!;
      drawCard(canvas, context);
    }
  }

  const drawCard = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);
  }

  const handleClick = () => {
    if (canClick()) {
      switch (props.mode) {
        case "drawDeck":
          props.game.drawTrainCardFromDeck();
          break;
        case "drawFaceUp":
          props.game.drawFaceUpTrainCard(props.card);
          break;
        case "playerHand":
          props.game.selectTrainCard(props.card);
          break;
        case "playerHandSelected":
          props.game.unselectTrainCard(props.card);
          break;
      }
    }
  }

  const canClick = () => {
    return (props.mode === "drawDeck" && (localPlayerState === PlayerState.StartingTurn || localPlayerState === PlayerState.DrawingTrainCards))
      || (props.mode === "drawFaceUp" && (localPlayerState === PlayerState.StartingTurn
        || (localPlayerState === PlayerState.DrawingTrainCards && props.card.color !== TrainCardColor.Wild)))
      || (props.mode === "playerHand" && localPlayerState === PlayerState.StartingTurn && selectedRoute
        && props.game.selectableTrainCardsForRoute(selectedRoute).find(value => value === props.card.color) !== undefined)
      || (props.mode === "playerHandSelected");
  }

  const style = { ...props.extraProps?.style };
  if (canClick()) {
    style["cursor"] = "pointer";
  } else {
    if ((props.mode === "drawFaceUp" && localPlayerState === PlayerState.DrawingTrainCards)
      || (props.mode === "playerHand" && localPlayerState === PlayerState.StartingTurn && selectedRoute)) {
      style["filter"] = "brightness(0.4)";
    }
  }

  const newProps = { ...props.extraProps };
  newProps["style"] = style;

  return (
    <Fade in={fade} timeout={750}>
      <Box {...newProps} component="canvas" ref={canvasRef} onClick={handleClick} />
    </Fade>
  );
}