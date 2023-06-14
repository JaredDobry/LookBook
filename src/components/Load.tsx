import { FileOpen } from "@mui/icons-material";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Button,
} from "@mui/material";
import React from "react";
import { useBoundStore } from "../state";

export const Load: React.FC = () => {
  const hiddenInputRef = React.useRef<HTMLInputElement>(null);
  const [openWarning, setOpenWarning] = React.useState<boolean>(false);
  const people = useBoundStore((state) => state.people);
  const viewing = useBoundStore((state) => state.viewing);
  const setDescription = useBoundStore((state) => state.setDescription);
  const setName = useBoundStore((state) => state.setName);
  const setPeople = useBoundStore((state) => state.setPeople);

  const handleLoad = () => {
    hiddenInputRef.current?.click();
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const data = await file.text();
      const json = JSON.parse(data);
      setDescription(json.description);
      setName(json.name);
      setPeople(json.people);
    }
  };

  if (viewing) {
    return (
      <>
        <Button
          onClick={() => {
            handleLoad();
          }}
        >
          Load a LookBook
        </Button>
        <input
          accept={".json"}
          hidden={true}
          onChange={(event) => {
            onFileChange(event);
          }}
          ref={hiddenInputRef}
          type="file"
        />
      </>
    );
  }

  return (
    <>
      <Tooltip title="Import a LookBook from JSON">
        <IconButton
          onClick={() => {
            if (people.length > 0) setOpenWarning(true);
            else handleLoad();
          }}
        >
          <FileOpen color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={() => {
          setOpenWarning(false);
        }}
        open={openWarning}
      >
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          Loading a LookBook will discard any unsaved changes.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenWarning(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenWarning(false);
              handleLoad();
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      <input
        accept={".json"}
        hidden={true}
        onChange={(event) => {
          onFileChange(event);
        }}
        ref={hiddenInputRef}
        type="file"
      />
    </>
  );
};
