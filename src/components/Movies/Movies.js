import React, { useEffect, useState } from "react";

import moviesApi from "../../utils/MoviesApi";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const Movies = ({
  // movies,
  isLoading,
  onCardclick,
  loggedIn,
  setIsloading,
  // setMovies,
  handleError,
  // onSubmit,
  onClick,
}) => {
  const [checkedShotFilms, setCheckedShotFilms] = React.useState(
    localStorage.getItem("checkedShotFilms") || false
  );
  const [movies, setMovies] = useState([]);
  const [loadMovies, setLoadMovies] = React.useState(
    JSON.parse(localStorage.getItem("allMovies")) || []
  );

  const [isNotFound, setIsNotFound] = React.useState(false);

  const handleChange = () => {
    setCheckedShotFilms(!checkedShotFilms);
  };

  const filterBySimbols = (movie, search) => {
    return (
      movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(search.toLowerCase())
    );
  };

  const moviesFiltered = (data, search) => {
    const filteredMovies = data.filter((movie) =>
      filterBySimbols(movie, search.film)
    );
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
      return;
    }
    if (checkedShotFilms) {
      const shotFilteredMovies = filteredMovies.filter(
        (movie) => movie.duration <= 40
      );
      if (shotFilteredMovies.length === 0) {
        setIsNotFound(true);
        return;
      }
      setMovies(shotFilteredMovies);
      localStorage.setItem(
        "shotFilteredMovies",
        JSON.stringify(shotFilteredMovies)
      );
      localStorage.setItem("search", search.film);
      localStorage.setItem("checkedShotFilms", checkedShotFilms);

      setIsNotFound(false);
      return;
    }
    setMovies(filteredMovies);
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    localStorage.setItem("search", search.film);
    localStorage.setItem("checkedShotFilms", checkedShotFilms);
    setIsNotFound(false);
  };

  const onSubmitForm = (search) => {
    let allMovies = JSON.parse(localStorage.getItem("allMovies"));
    setIsloading(true);

    if (!allMovies) {
      moviesApi
        .getInitialMovies()
        .then((moviesData) => {
          localStorage.setItem("allMovies", JSON.stringify(moviesData));

          setLoadMovies(moviesData);
          moviesFiltered(moviesData, search);
          setIsloading(false);
        })
        .catch(handleError);
    } else {
      moviesFiltered(loadMovies, search);

      setIsloading(false);
    }

    // console.log(allMovies);

    // const filtered =  allMovies.filter((movie) =>
    //   filterBySimbols(movie, search.film)
    // );
    // setMovies(filtered);
    // setIsloading(false);
    // console.log(filtered);
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
          isNotFound={isNotFound}
        />
        <button className="movies__buttonAdd">Ещё</button>
      </section>
    </>
  );
};

export default Movies;
