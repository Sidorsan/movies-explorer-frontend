import React, { useState } from "react";

import moviesApi from "../../utils/MoviesApi";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const Movies = ({
  movies,
  isLoading,
  onCardclick,
  loggedIn,
  setIsloading,
  setMovies,
  handleError,
  // onSubmit,
  onClick,
}) => {
  const [checkedShotFilms, setCheckedShotFilms] = React.useState(false);
  const handleChange = () => {
    setCheckedShotFilms(!checkedShotFilms);
  };

  const filterBySimbols = (movie, search) => {
    return movie.nameRU.toLowerCase().includes(search.toLowerCase());
  };

  const onSubmitForm = (search) => {
    let allMovies = JSON.parse(localStorage.getItem("allMovies"));
    console.log(allMovies);
    setIsloading(true);

    if (!allMovies) {
      moviesApi
        .getInitialMovies()
        .then((moviesData) => {
          localStorage.setItem("allMovies", JSON.stringify(moviesData));
          setMovies(moviesData);
          setIsloading(false);
        })
        .catch(handleError);
    }

    if (checkedShotFilms) {
      console.log(allMovies);
      const filtered = allMovies.filter((movie) =>
        filterBySimbols(movie, search.film)
      );
      console.log(filtered);
    }
  };

  return (
    <>
      <section className="movies">
        <div className="movies__searchAndFilter">
          <SearchForm onSubmit={onSubmitForm} />
          <FilterCheckbox onChange={handleChange} />
        </div>

        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          onCardclick={onCardclick}
          loggedIn={loggedIn}
          onSubmit={onSubmitForm}
        />
        <button className="movies__buttonAdd">Ещё</button>
      </section>
    </>
  );
};

export default Movies;
