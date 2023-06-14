import React from "react";
import { useBoundStore } from "../state";
import { Book } from "../components/Book";
import { CssBaseline, Box } from "@mui/material";

export const BookViewer: React.FC = () => {
  const people = useBoundStore((state) => state.people);
  const setViewing = useBoundStore((state) => state.setViewing);
  setViewing(true);

  return (
    <>
      <CssBaseline />
      <Box
        alignItems={people.length === 0 ? "center" : "inherit"}
        display="flex"
        height={people.length === 0 ? "100vh" : "auto"}
        justifyContent="center"
        p={2}
      >
        <Book />
      </Box>
    </>
  );
};
