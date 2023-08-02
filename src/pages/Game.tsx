import { DrawCardArea } from "../components/DrawCardArea";
import { Gameboard } from "../components/Gameboard";
import { PlayersArea } from "../components/PlayersArea";
import { GameController, LocalSelectedTrainCardsChangeEventArgs, PlayerTrainCardsChangeEventArgs } from "../controllers/GameController";
import { Stack } from "@mui/material";
import tileBlack from "../images/backgrounds/tile-black.jpg";
import { useEffect, useState } from "react";
import { GameHistory } from "../components/GameHistory";
import { LocalTrainCards } from "../components/LocalTrainCards";
import { LocalDestinationCards } from "../components/LocalDestinationCards";
import { PlayerControls } from "../components/PlayerControls";
import { LocalSelectedTrainCards } from "../components/LocalSelectedTrainCards";

export interface GameProps {
  game: GameController;
}

export const Game = (props: GameProps) => {
  const [localPlayerTrainCards, setLocalPlayerTrainCards] = useState(props.game.localPlayer?.trainCards);
  const [localSelectedTrainCards, setLocalSelectedTrainCards] = useState(props.game.localSelectedTrainCards);

  useEffect(() => {
    props.game.addEventListener("onPlayerTrainCardsChange", (e) => handlePlayerTrainCardsChange(e));
    return props.game.removeEventListener("onPlayerTrainCardsChange", handlePlayerTrainCardsChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.game.addEventListener("onLocalSelectedTrainCardsChange", (e) => handleLocalSelectedTrainCardsChange(e));
    return props.game.removeEventListener("onLocalSelectedTrainCardsChange", handleLocalSelectedTrainCardsChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerTrainCardsChange = (e: CustomEventInit<PlayerTrainCardsChangeEventArgs>) => {
    if (props.game.localPlayer?.name === e.detail?.player.name) {
      setLocalPlayerTrainCards([...e.detail!.cards]);
    }
  }

  const handleLocalSelectedTrainCardsChange = (e: CustomEventInit<LocalSelectedTrainCardsChangeEventArgs>) => {
    setLocalSelectedTrainCards([...e.detail!.cards]);
  }

  return (
    <Stack boxShadow="inset 0 0 0 2px darkgoldenrod" style={{ backgroundImage: `url(${tileBlack})`, backgroundRepeat: "repeat" }}>
      <Stack boxShadow="inset 0 -2px 0 0 darkgoldenrod" key="topRow" direction="row" justifyContent="space-between">
        <PlayersArea key="playerArea" game={props.game} extraProps={{ width: "29vh", boxShadow: "inset -2px 0 0 0 darkgoldenrod" }} />
        <Gameboard
          key="gameboard"
          game={props.game}
          extraProps={{ height: "80vh", flexGrow: 1 }} />
        <DrawCardArea
          key="drawCardArea"
          game={props.game}
          extraProps={{ width: "18vh", boxShadow: "inset 2px 0 0 0 darkgoldenrod" }} />
      </Stack>
      <Stack key="bottomRow" direction="row" height="20vh" >
        <GameHistory key="gameHistory" game={props.game} extraProps={{ width: "29vh", boxShadow: "inset -2px 0 0 0 darkgoldenrod" }} />
        <PlayerControls key="playerControls" game={props.game} extraProps={{ width: "29vh", boxShadow: "inset -2px 0 0 0 darkgoldenrod" }} />
        {localPlayerTrainCards && localPlayerTrainCards.length > 0 &&
          <LocalTrainCards key="trainCards" game={props.game} extraProps={{ boxShadow: "inset -2px 0 0 0 darkgoldenrod" }} />}
        {localSelectedTrainCards.length > 0 && <LocalSelectedTrainCards key="selectedCards" game={props.game} extraProps={{ boxShadow: "inset -2px 0 0 0 darkgoldenrod" }} />}
        <LocalDestinationCards key="destinationCards" game={props.game} />
      </Stack>
    </Stack>
  );
}