"use client";
import { useState } from "react";
import SearchBar from "material-ui-search-bar";

export default function Searchbar(): any {
  const [searchValue, setSearchValue] = useState("");
  return (
    <SearchBar
      value={searchValue}
      onChange={setSearchValue}
      onRequestSearch={() => console.log("searching for", searchValue)}
      style={{
        margin: "0 auto",
        minWidth: 200,
        maxWidth: 1000,
      }}
    />
  );
}
