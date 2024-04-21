"use client"; //remove!
import React from "react";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Categories from "./Categories";

interface Props {
  categories: {
    id: string;
    name: string;
  }[];
}

export default function BasicSelect({ categories }: Props) {
  const [category, setCategory] = useState();

  const handleChange = (event: SelectChangeEvent) => {
    // remove!
    setCategory(event.target.value);

    //onCategoryChange(category);
  };

  return (
    <Box>
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          label="Select Category"
          value={category}
          autoWidth
          onChange={handleChange}
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
          <Categories categories={categories} />
        </Select>
      </FormControl>
    </Box>
  );
}
