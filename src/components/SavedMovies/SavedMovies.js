import React from "react";

import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const SavedMovies = ({
  isLoading,
  onCardClick,
  loggedIn,
  savedMovies,
  onSubmitForm,
  isNotFound,
  handleChange,
}) => {
  return (
    <>
      <section className="savedMovies">
        <div className="movies__searchAndFilter">
          <SearchForm onSubmit={onSubmitForm} />
          <FilterCheckbox onChange={handleChange} />
        </div>
        <MoviesCardList
          movies={savedMovies}
          isLoading={isLoading}
          onCardClick={onCardClick}
          loggedIn={loggedIn}
          isNotFound={isNotFound}
          savedMovies={savedMovies}
        />
      </section>
    </>
  );
};

export default SavedMovies;
