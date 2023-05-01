import { Box, List, ListItem, ListItemText } from "@mui/material";
import { GameController, MessagesChangeEventArgs } from "../controllers/GameController";
import { useEffect, useState } from "react";

export interface GameHistoryProps {
  game: GameController;
  extraProps?: any;
}

export const GameHistory = (props: GameHistoryProps) => {
  const [messages, setMessages] = useState([...props.game.messages].reverse());

  useEffect(() => {
    props.game.addEventListener('onMessagesChange', (e) => handleMessagesChange(e));
    return props.game.removeEventListener('onMessagesChange', handleMessagesChange);
  }, [props.game]);

  const handleMessagesChange = (e: CustomEventInit<MessagesChangeEventArgs>) => {
    setMessages([...e.detail!.messages].reverse());
  }

  const messageList = [];
  let index = messages.length - 1;
  for (const message of messages) {
    messageList.push(
      <ListItem key={index} disablePadding={true}>
        <ListItemText primary={message} primaryTypographyProps={{ variant: 'body2' }} />
      </ListItem>
    );
    index--;
  }

  return (
    <Box padding='1.5vh' {...props.extraProps} flexShrink={0} >
      <List disablePadding={true} dense={true} sx={{ height: '100%', overflowY: 'auto', userSelect: 'none' }} >
        {messageList}
      </List>
    </Box>
  );
}