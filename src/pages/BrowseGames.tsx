import React, { useState } from "react";
import { Stack, List, ListItem, ListItemText, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export interface BrowseGameProps {
}

export const BrowseGames = (props: BrowseGameProps) => {
  const [error, setError] = useState("");

  //TODO: Remove
  const games = [
    {
      id: 111111,
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: 222222,
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: 333333,
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: 111111,
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: 222222,
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: 333333,
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    }
  ];

  const gameList = games.map((game) => {
    return <ListItem sx={{ bgcolor: 'theme.primary' }} key={game.id}>
      <ListItemText
        primary={`ID: ${game.id}`}
        secondary={`Players: ${game.players.join(", ")}`}
      />
      <Button variant='outlined'>Join</Button>
      <Button variant='outlined'><DeleteIcon /></Button>
    </ListItem>
  });

  return (
    <Stack>
      <List>
        {gameList}
      </List>
    </Stack>
  );
}