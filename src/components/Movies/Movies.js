import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const Movies = ({ cards, isLoading, onCardclick, loggedIn }) => {
  return (
    <>
      <main>
        <div className="movies">
          <SearchForm />
          <FilterCheckbox />
          <MoviesCardList
            cards={cards}
            isLoading={isLoading}
            onCardclick={onCardclick}
            loggedIn={loggedIn}
          />
          <button className="element__buttonAdd">Ещё</button>
        </div>
      </main>
    </>
  );
};

export default Movies;
