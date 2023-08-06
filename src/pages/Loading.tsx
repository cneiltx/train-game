import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box display="flex" height="100%" alignItems="center">
      <CircularProgress />
    </Box>
  );
}