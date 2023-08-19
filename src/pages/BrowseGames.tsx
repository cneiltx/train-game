import React, { useState } from "react";
import { Stack, List, ListItem, ListItemText, Button, Box, useTheme, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export interface BrowseGameProps {
  onCancel: () => void;
}

export const BrowseGames = (props: BrowseGameProps) => {
  const [error, setError] = useState("");

  //TODO: Remove
  const games = [
    {
      id: "111111",
      players: ["Shaggy Doo", "Velma Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: "222222",
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: "333333",
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: "444444",
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: "555555",
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: "666666",
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: "777777",
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: "888888",
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    },
    {
      id: "999999",
      players: ["Shaggy Doo", "Velma Doo", "Daphne Doo", "Fred Doo", "Scooby Doo"],
      created: new Date(2023, 8, 1, 14, 35, 50, 800),
      modified: new Date(2023, 8, 5, 10, 7, 18, 230)
    }
  ];

  const handleJoinGame = (id: string) => {
    alert(`Join game ${id}`);
  }

  const handleDeleteGame = (id: string) => {
    alert(`Delete game ${id}`);
  }

  const theme = useTheme();

  const gameList = games.map((game) => {
    return (
      <ListItem sx={{ bgcolor: theme.palette.primary.contrastText, margin: "7px 0" }} key={game.id}>
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Stack>
            <Typography>
              ID: {game.id}
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              <b>Started:</b> {game.created.toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              <b>Last Played:</b> {game.created.toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              <b>Players:</b> {game.players.join(", ")}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Button variant="outlined" onClick={() => handleJoinGame(game.id)}>Join</Button>
            <Button variant="outlined" onClick={() => handleDeleteGame(game.id)}><DeleteIcon /></Button>
          </Stack>
        </Stack>
      </ListItem>
    );
  });

  return (
    <Stack justifyContent="space-between" alignItems="center" sx={{ overflow: "hidden" }} >
      <Stack sx={{ overflowY: "auto" }}>
        <List>
          {gameList}
        </List>
      </Stack>
      <Box paddingTop={2}>
        <Button variant="outlined" onClick={props.onCancel}>Cancel</Button>
      </Box>
    </Stack>
  );
}