import React from "react";
import { Book } from "./pages/Book";
import { MenuBar } from "./components/MenuBar";
import { Box, CssBaseline } from "@mui/material";
import { useBoundStore } from "./state";

const App: React.FC = () => {
  const doExport = useBoundStore((state) => state.export);
  const imageSize = useBoundStore((state) => state.imageSize);
  const people = useBoundStore((state) => state.people);

  const lookBookToHTML = React.useCallback(() => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          marginLeft: "16px",
        }}
      >
        {people.map((person) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                marginTop: "16px",
              }}
            >
              <img
                alt={person.name}
                height={`${imageSize}px`}
                src={person.photo}
                width={`${imageSize}px`}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: `${imageSize}px`,
                  marginLeft: "16px",
                }}
              >
                <p style={{ marginBottom: "0px", marginTop: "16px" }}>
                  {person.name}
                </p>
                <p style={{ marginBottom: "0px", marginTop: "16px" }}>
                  {person.biography}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [imageSize, people]);

  if (doExport) {
    return lookBookToHTML();
  }

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

export default App;
