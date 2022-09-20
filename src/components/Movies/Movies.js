import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";

function Movies(props) {
  return (
    <>
      <SearchForm />
      <FilterCheckbox />
    </>
  );
}

export default Movies;
