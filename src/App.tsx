import React from "react";
import { Book } from "./pages/Book";
import { MenuBar } from "./components/MenuBar";
import { Box } from "@mui/material";

const App: React.FC = () => {
  return (
    <>
      <MenuBar />
      <Box p={2}>
        <Book />
      </Box>
    </>
  );
};

export default App;
