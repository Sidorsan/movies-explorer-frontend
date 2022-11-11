import React, { useEffect, useState } from "react";

import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import mainApi from "../../utils/MainApi";

const SavedMovies = ({
  isLoading,
  onCardClick,
  loggedIn,
  savedMovies,
  onSubmitForm,
  isNotFound,
  handleChange,
}) => {
  // const [movies, setMovies] = useState(savedMovies);

  useEffect(() => {
    // if (loggedIn) {
    // setIsloading(true);
    // mainApi.getInitialMovies().then((movies) => {
    // setMovies(savedMovies);
    // setIsloading(false);
    // });
    // .catch(handleError);
    // }
  }, [savedMovies]);

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
          // onSubmit={}
        />
      </section>
    </>
  );
};

export default SavedMovies;
