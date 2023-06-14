import { Save as SaveIcon } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useBoundStore } from "../state";
import { saveAs } from "file-saver";

export const Save: React.FC = () => {
  const description = useBoundStore((state) => state.description);
  const name = useBoundStore((state) => state.name);
  const people = useBoundStore((state) => state.people);
  const lookBookToJSON = React.useCallback((): string => {
    return JSON.stringify({
      description: description,
      name: name,
      people: people,
    });
  }, [description, name, people]);

  return (
    <Tooltip title="Save LookBook to JSON">
      <div>
        <IconButton
          disabled={people.length === 0}
          onClick={() => {
            const blob = new Blob([lookBookToJSON()], {
              type: "text/json;charset=utf-8",
            });
            saveAs(blob, `${name}.json`);
          }}
        >
          <SaveIcon color={people.length === 0 ? "disabled" : "primary"} />
        </IconButton>
      </div>
    </Tooltip>
  );
};
