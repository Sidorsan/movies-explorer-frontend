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

  const filterMovies = () => {
    return movies.filter((card) => {});
  };
  const onSubmitForm = (data) => {
    // console.log(data);
    setIsloading(true);
    const allMovies = JSON.parse(localStorage.getItem("AllMovies"));
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
