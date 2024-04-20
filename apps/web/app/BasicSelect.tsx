"use client";
import * as React from "react";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

export default function BasicSelect(): JSX.Element {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box>
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          label="Select Category"
          onChange={handleChange}
          autoWidth
          MenuProps={{
            MenuListProps: {
              sx: {
                "li.MuiButtonBase-root": {
                  display: "flex",
                  flexDirection: "column",
                },
              },
            },
          }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
