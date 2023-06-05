import { Photo } from "@mui/icons-material";
import { Button, Popover, Box, TextField } from "@mui/material";
import React from "react";
import { useBoundStore } from "../state";

const toNumeric = (s: string): string => {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i].match(/\d/)) out += s[i];
  }
  return out;
};

export const PhotoSize: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const imageSize = useBoundStore((state) => state.imageSize);
  const [open, setOpen] = React.useState<boolean>(false);
  const setImageSize = useBoundStore((state) => state.setImageSize);

  const onImageSizeChange = React.useCallback(
    (value: string) => {
      console.log(value);
      setImageSize(toNumeric(value));
    },
    [setImageSize]
  );
  return (
    <>
      <Button
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
          setOpen(true);
        }}
      >
        <Photo />
      </Button>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        onClose={() => {
          setAnchorEl(null);
          setOpen(false);
        }}
        open={open}
      >
        <Box p={1}>
          <TextField
            label="Image Size (px)"
            onChange={(event) => {
              onImageSizeChange(event.target.value);
            }}
            value={imageSize}
          />
        </Box>
      </Popover>
    </>
  );
};
