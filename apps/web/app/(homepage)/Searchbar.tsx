"use client";

import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import SearchBar from "material-ui-search-bar";

// export default function Searchbar(): any {
//   const [searchValue, setSearchValue] = useState("");
//   return <></>;
// }

export default function Searchbar(): any {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <TextField
        hiddenLabel
        id="filled-hidden-label-normal"
        defaultValue="Search"
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
