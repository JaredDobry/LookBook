import { PictureAsPdf } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import React from "react";
import { useBoundStore } from "../state";

export const Export: React.FC = () => {
  const people = useBoundStore((state) => state.people);
  const setExport = useBoundStore((state) => state.setExport);

  return (
    <Tooltip title="Export LookBook to PDF">
      <Button
        disabled={people.length === 0}
        onClick={() => {
          setExport();
        }}
      >
        <PictureAsPdf />
      </Button>
    </Tooltip>
  );
};
