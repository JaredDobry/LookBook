import React from "react";
import { Stack, Typography } from "@mui/material";
import { useBoundStore } from "../state";
import { Look } from "../components/Look";

export const Book: React.FC = () => {
  const people = useBoundStore((state) => state.people);

  if (people.length === 0) {
    return (
      <Typography>
        Nothing here yet, either load an existing LookBook or click the plus
        button to start a new one.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {people.map((person) => {
        return <Look key={`look-${person.id}`} person={person} />;
      })}
    </Stack>
  );
};
