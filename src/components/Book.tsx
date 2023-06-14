import React from "react";
import { Paper, Stack, TextField, Typography } from "@mui/material";
import { useBoundStore } from "../state";
import { Look } from "./Look";
import { Load } from "./Load";

export const Book: React.FC = () => {
  const description = useBoundStore((state) => state.description);
  const name = useBoundStore((state) => state.name);
  const people = useBoundStore((state) => state.people);
  const viewing = useBoundStore((state) => state.viewing);
  const setDescription = useBoundStore((state) => state.setDescription);
  const setName = useBoundStore((state) => state.setName);

  if (people.length === 0) {
    if (viewing) {
      return <Load />;
    }

    return (
      <Typography>
        Nothing here yet, either load an existing LookBook or click the plus
        button to start a new one.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      <Paper elevation={5}>
        <Stack p={2} spacing={2}>
          {!viewing && (
            <>
              <TextField
                fullWidth={true}
                label="Book Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
              />
              <TextField
                fullWidth={true}
                label="Book Description"
                multiline={true}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                value={description}
              />
            </>
          )}
          {viewing && (
            <>
              <Typography variant="h3">{name}</Typography>
              <Typography>{description}</Typography>
            </>
          )}
        </Stack>
      </Paper>

      {people.map((person) => {
        return <Look key={`look-${person.id}`} person={person} />;
      })}
    </Stack>
  );
};
