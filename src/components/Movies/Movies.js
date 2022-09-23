import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const Movies = ({ cards, isLoading, loggedIn }) => {
  return (
    <>
      <main>
        <SearchForm />
        <FilterCheckbox />
        <MoviesCardList
          cards={cards}
          isLoading={isLoading}
          loggedIn={loggedIn}
        />
      </main>
    </>
  );
};

export default Movies;
