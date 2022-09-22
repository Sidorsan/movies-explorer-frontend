import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const Movies = ({ cards, isLoading, loggedIn }) => {
  return (
    <>
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList cards={cards} isLoading={isLoading} loggedIn={loggedIn} />
    </>
  );
};

export default Movies;
