import { FileOpen } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useBoundStore } from "../state";

export const Load: React.FC = () => {
  const hiddenInputRef = React.useRef<HTMLInputElement>(null);
  const [openWarning, setOpenWarning] = React.useState<boolean>(false);
  const people = useBoundStore((state) => state.people);
  const setPeople = useBoundStore((state) => state.setPeople);

  const handleLoad = () => {
    hiddenInputRef.current?.click();
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const data = await file.text();
      setPeople(JSON.parse(data).people);
    }
  };

  return (
    <>
      <Tooltip title="Import a LookBook from JSON">
        <Button
          onClick={() => {
            if (people.length > 0) setOpenWarning(true);
            else handleLoad();
          }}
        >
          <FileOpen />
        </Button>
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
