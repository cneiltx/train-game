import { Box, CircularProgress, Grid, Stack } from "@mui/material";

export const Loading = () => {
  return (
    <Stack justifyContent="space-between" alignItems="center" >
      <Stack>
        <Grid
          width={400}
          container
          textAlign="center"
          alignItems="center"
          padding={2}
          spacing={1}
        >
          <Grid item xs={12} sx={{ fontSize: "h4.fontSize" }}>Welcome to<br></br>The Train Game!</Grid>
          <Grid item xs={12} height="1rem" />
        </Grid>
      </Stack>
      <Box display="flex" height="100%" alignItems="center">
        <CircularProgress />
      </Box>
      <Box />
    </Stack>
  );
}