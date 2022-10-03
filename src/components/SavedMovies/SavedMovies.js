import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const SavedMovies = ({ movies, isLoading, onCardclick, loggedIn }) => {

  return (
    <>
      <section className="savedMovies">
        <div className="movies__searchAndFilter">
          <SearchForm />
          <FilterCheckbox />
        </div>
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          onCardclick={onCardclick}
          loggedIn={loggedIn}
          // onSubmit={}
        />
      </section>
    </>
  );
};

export default SavedMovies;
