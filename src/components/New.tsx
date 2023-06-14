import React from "react";
import { useBoundStore } from "../state";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

export const New: React.FC = () => {
  const people = useBoundStore((state) => state.people);
  const addPerson = useBoundStore((state) => state.addPerson);

  const addEmptyPerson = React.useCallback(() => {
    if (people.length === 0) {
      addPerson({
        biography: "",
        id: 0,
        name: "",
        photo: "",
      });
    } else {
      addPerson({
        biography: "",
        id: people.slice(-1)[0].id + 1,
        name: "",
        photo: "",
      });
    }
  }, [addPerson, people]);

  return (
    <Button
      onClick={() => {
        addEmptyPerson();
      }}
    >
      <Add />
    </Button>
  );
};
