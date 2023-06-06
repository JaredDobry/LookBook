import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Person, useBoundStore } from "../state";
import placeholderImg from "../logo.svg";

type PhotoProps = {
  person: Person;
};

export const Photo: React.FC<PhotoProps> = (props) => {
  const imageSize = useBoundStore((state) => state.imageSize);
  const [open, setOpen] = React.useState<boolean>(false);
  const updatePerson = useBoundStore((state) => state.updatePerson);
  const [url, setUrl] = React.useState<string>("");

  return (
    <>
      <img
        alt={`${props.person.name}`}
        height={`${imageSize === "" ? 0 : imageSize}px`}
        id={`look-photo-${props.person.name}`}
        onClick={() => setOpen(true)}
        src={props.person.photo === "" ? placeholderImg : props.person.photo}
        width={`${imageSize === "" ? 0 : imageSize}px`}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add a Look image</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <DialogContentText>Enter an image URL</DialogContentText>
            <Box minWidth={500}>
              <TextField
                fullWidth={true}
                onChange={(event) => {
                  setUrl(event.target.value);
                }}
                value={url}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              updatePerson({
                ...props.person,
                photo: url,
              });
              setOpen(false);
            }}
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
