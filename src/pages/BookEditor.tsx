import { CssBaseline, Box } from "@mui/material";
import React from "react";
import { MenuBar } from "../components/MenuBar";
import { Book } from "../components/Book";
import { useBoundStore } from "../state";

export const BookEditor: React.FC = () => {
  const setViewing = useBoundStore((state) => state.setViewing);
  setViewing(false);

  return (
    <>
      <CssBaseline />
      <MenuBar />
      <Box display="flex" justifyContent="center" p={2}>
        <Book />
      </Box>
    </>
  );
};
