import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { GameController, MessagesChangeEventArgs } from "../controllers/GameController";
import { useEffect, useState } from "react";

export interface PlayerInstructionsProps {
  game: GameController;
  extraProps?: any;
}

export const PlayerInstructions = (props: PlayerInstructionsProps) => {
  const [messages, setMessages] = useState(props.game.messages);

  useEffect(() => {
    props.game.addEventListener('onMessagesChange', (e) => handleMessagesChange(e));
    return props.game.removeEventListener('onMessagesChange', handleMessagesChange);
  }, [props.game]);

  const handleMessagesChange = (e: CustomEventInit<MessagesChangeEventArgs>) => {
    setMessages([...e.detail!.messages].reverse());
  }

  return (
    <Typography variant='body2' sx={{ height: '100%', overflowY: 'auto', userSelect: 'none' }} >
      TODO: Put player instructions here.
    </Typography>
  );
}