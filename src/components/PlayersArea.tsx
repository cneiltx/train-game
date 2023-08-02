import { Stack } from "@mui/material";
import { PlayerSummary } from "./PlayerSummary";
import { GameController, PlayersChangeEventArgs } from "../controllers/GameController";
import { useEffect, useState } from "react";

export interface PlayersAreaProps {
  game: GameController;
  extraProps?: any;
}

export const PlayersArea = (props: PlayersAreaProps) => {
  const [players, setPlayers] = useState(props.game.players);

  useEffect(() => {
    props.game.addEventListener("onPlayersChange", (e) => handlePlayersChange(e));
    return props.game.removeEventListener("onPlayersChange", handlePlayersChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayersChange = (e: CustomEventInit<PlayersChangeEventArgs>) => {
    setPlayers([...e.detail!.players]);
  }

  const playerList: JSX.Element[] = [];

  for (const player of players) {
    playerList.push(<PlayerSummary key={player.name} game={props.game} player={player} extraProps={{ height: "13vh", width: "26vh" }} />);
  }

  return (
    <Stack padding="1.5vh" spacing="1.5vh" {...props.extraProps} >
      {playerList}
    </Stack>
  );
}