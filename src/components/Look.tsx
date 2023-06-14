import React from "react";
import { Person, useBoundStore } from "../state";
import { IconButton, Paper, Stack, TextField } from "@mui/material";
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
    <Stack direction="row" spacing={2}>
      <Paper>
        <Stack height="100%" justifyContent="space-between" p={1}>
          <IconButton
            disabled={personAbove === undefined}
            onClick={() => {
              if (personAbove) swapPeople(props.person, personAbove);
            }}
          >
            <ArrowUpward
              color={personAbove === undefined ? "disabled" : "primary"}
            />
          </IconButton>
          <IconButton
            disabled={personBelow === undefined}
            onClick={() => {
              if (personBelow) swapPeople(props.person, personBelow);
            }}
          >
            <ArrowDownward
              color={personBelow === undefined ? "disabled" : "primary"}
            />
          </IconButton>
        </Stack>
      </Paper>
      <Paper>
        <Stack direction="row" spacing={2} p={2}>
          <Photo person={props.person} />
          <Stack
            height={`${imageSize}px`}
            justifyContent="space-between"
            spacing={2}
            width={500}
          >
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth={true}
                label="Name"
                onChange={(event) => {
                  updatePerson({ ...props.person, name: event.target.value });
                }}
                placeholder="Name"
                value={props.person.name}
              />
              <IconButton
                onClick={() => {
                  removePerson(props.person);
                }}
              >
                <Close color="error" />
              </IconButton>
            </Stack>

            <TextField
              fullWidth={true}
              label="Biography"
              rows={Math.floor((Number(imageSize) - 105) / 23)}
              multiline={true}
              onChange={(event) => {
                updatePerson({
                  ...props.person,
                  biography: event.target.value,
                });
              }}
              placeholder="Biography"
              value={props.person.biography}
            />
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
