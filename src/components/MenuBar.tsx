import { Button, Stack } from "@mui/material";
import React from "react";
import { PhotoSize } from "./PhotoSize";
import { Load } from "./Load";
import { Save } from "./Save";
import { New } from "./New";

export const MenuBar: React.FC = () => {
  return (
    <Stack
      justifyContent="space-between"
      direction="row"
      position="sticky"
      px={1}
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid black",
        zIndex: 10,
      }}
      top="0px"
    >
      <Stack alignItems="center" direction="row" spacing={1}>
        <Button
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Look Book
        </Button>
        <Load />
        <Save />
        <New />
      </Stack>
      <Stack direction="row">
        <PhotoSize />
      </Stack>
    </Stack>
  );
};
