import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const SavedMovies = ({ cards, isLoading, onCardclick, loggedIn }) => {
  return (
    <>
      <main>
        <div className="savedMovies">
          <div className="movies__searchAndFilter">
            <SearchForm />
            <FilterCheckbox />
          </div>
          <MoviesCardList
            cards={cards}
            isLoading={isLoading}
            onCardclick={onCardclick}
            loggedIn={loggedIn}
          />
        </div>
      </main>
    </>
  );
};

export default SavedMovies;
