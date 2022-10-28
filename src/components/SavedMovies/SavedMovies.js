import React, { useEffect, useState } from "react";

import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import mainApi from "../../utils/MainApi";

const SavedMovies = ({ isLoading, onCardClick, loggedIn }) => {
  const [savedMovies, setSavedMovies] = useState([]
    // JSON.parse(localStorage.getItem("savedMovies"))
  );
  // useEffect(() => {
  //   JSON.parse(localStorage.getItem("savedMovies"));
  // }, [savedMovies]);
  useEffect(() => {
    // if (loggedIn) {
    // setIsloading(true);
    mainApi
      .getInitialMovies()
      .then((movies) => {
        setSavedMovies(movies);
        // setIsloading(false);
      })
      // .catch(handleError);
    // }
  }, []);

  console.log(savedMovies);
  return (
    <>
      <section className="savedMovies">
        <div className="movies__searchAndFilter">
          <SearchForm />
          <FilterCheckbox />
        </div>
        <MoviesCardList
          movies={savedMovies}
          isLoading={isLoading}
          onCardClick={onCardClick}
          loggedIn={loggedIn}
          // onSubmit={}
        />
      </section>
    </>
  );
};

export default SavedMovies;
