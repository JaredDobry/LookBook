import { Save as SaveIcon } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import React from "react";
import { useBoundStore } from "../state";
import { saveAs } from "file-saver";

export const Save: React.FC = () => {
  const people = useBoundStore((state) => state.people);
  const lookBookToJSON = React.useCallback((): string => {
    return JSON.stringify({ people: people });
  }, [people]);

  return (
    <Tooltip title="Save LookBook to JSON">
      <Button
        disabled={people.length === 0}
        onClick={() => {
          const blob = new Blob([lookBookToJSON()], {
            type: "text/json;charset=utf-8",
          });
          saveAs(blob, "LookBook.json");
        }}
      >
        <SaveIcon />
      </Button>
    </Tooltip>
  );
};
