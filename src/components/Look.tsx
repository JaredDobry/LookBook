import React from "react";
import { Person, useBoundStore } from "../state";
import { Button, Stack, TextField } from "@mui/material";
import { ArrowDownward, ArrowUpward, Close } from "@mui/icons-material";
import { Photo } from "./Photo";

type LookProps = {
  person: Person;
};

export const Look: React.FC<LookProps> = (props) => {
  const imageSize = useBoundStore((state) => state.imageSize);
  const people = useBoundStore((state) => state.people);
  const removePerson = useBoundStore((state) => state.removePerson);
  const swapPeople = useBoundStore((state) => state.swapPeople);
  const updatePerson = useBoundStore((state) => state.updatePerson);

  const personAbove = people.findLast((value: Person) => {
    return value.id < props.person.id;
  });

  const personBelow = people.find((value: Person) => {
    return value.id > props.person.id;
  });

  return (
    <Stack alignItems="start" direction="row" spacing={2}>
      <Stack justifyContent="space-between">
        <Button
          disabled={personAbove === undefined}
          onClick={() => {
            if (personAbove) swapPeople(props.person, personAbove);
          }}
        >
          <ArrowUpward />
        </Button>
        <Button
          disabled={personBelow === undefined}
          onClick={() => {
            if (personBelow) swapPeople(props.person, personBelow);
          }}
        >
          <ArrowDownward />
        </Button>
      </Stack>
      <Photo person={props.person} />
      <Stack minWidth={500} spacing={2}>
        <TextField
          fullWidth={true}
          label="Name"
          onChange={(event) => {
            updatePerson({ ...props.person, name: event.target.value });
          }}
          placeholder="Name"
          value={props.person.name}
        />
        <TextField
          fullWidth={true}
          label="Biography"
          maxRows={Math.floor((Number(imageSize) - 105) / 23)} // Top TextField size + margin + inner area padding = 105px. Single row = 23px
          multiline={true}
          onChange={(event) => {
            updatePerson({ ...props.person, biography: event.target.value });
          }}
          placeholder="Biography"
          value={props.person.biography}
        />
      </Stack>
      <Button
        onClick={() => {
          removePerson(props.person);
        }}
      >
        <Close />
      </Button>
    </Stack>
  );
};
