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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessagesChange = (e: CustomEventInit<MessagesChangeEventArgs>) => {
    setMessages([...e.detail!.messages].reverse());
  }

  const messageList: JSX.Element[] = [];
  let index = messages.length - 1;
  for (const message of messages) {
    const priorityStyle: any = {};

    if (message.priority) {
      priorityStyle['sx'] = { color: 'goldenrod' };
    }

    messageList.push(
      <ListItem key={index} disablePadding={true} >
        <ListItemText primary={message.message} primaryTypographyProps={{ variant: 'body2' }} {...priorityStyle} />
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