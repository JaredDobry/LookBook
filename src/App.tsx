import { Box, Button, CssBaseline, Stack, Typography } from "@mui/material";
import React from "react";
import { useBoundStore } from "./state";

const App: React.FC = () => {
  const setViewing = useBoundStore((state) => state.setViewing);
  setViewing(false);

  return (
    <>
      <CssBaseline />
      <Box
        alignItems="center"
        display="flex"
        height="100vh"
        justifyContent="center"
        p={2}
      >
        <Stack spacing={4}>
          <Typography variant="h1">Look Book</Typography>
          <Stack direction="row" justifyContent="center" spacing={4}>
            <Button
              onClick={() => {
                window.location.href = "/edit";
              }}
            >
              <Typography variant="h4">Edit</Typography>
            </Button>
            <Button
              onClick={() => {
                window.location.href = "/view";
              }}
            >
              <Typography variant="h4">View</Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default App;
