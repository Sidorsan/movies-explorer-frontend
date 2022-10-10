import React, { useEffect, useState } from "react";

import moviesApi from "../../utils/MoviesApi";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const Movies = ({
  onCardclick,
  loggedIn,
  // handleError,
  onClick,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [checkedShotFilms, setCheckedShotFilms] = React.useState(
    localStorage.getItem("checkedShotFilms") === "true"
  );
  const [movies, setMovies] = useState([]);
  const [loadMovies, setLoadMovies] = React.useState(
    JSON.parse(localStorage.getItem("allMovies")) || []
  );

  const [isNotFound, setIsNotFound] = React.useState({
    title: "",
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [displayedMovies, setDisplayedMovies] = useState([]);


  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWindowWidth(window.innerWidth), 100);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  console.log(windowWidth);

  // const displayedMovieschange = () => {
  //   setDisplayedMovies(JSON.parse(
  //     localStorage.getItem("filteredMovies")
  //   ).slice(0, 3))
  //   console.log(displayedMovies);
  // }
  // displayedMovieschange();


  useEffect(() => {
    if (localStorage.getItem("filteredMovies")) {
      setIsLoading(true);
      setMovies(JSON.parse(localStorage.getItem("filteredMovies")));
      setIsLoading(false);
      setIsNotFound(false);
    }
  }, []);

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
      setIsNotFound({ title: "Ничего не найдено" });
      return;
    }
    if (checkedShotFilms) {
      console.log(checkedShotFilms);
      const shotFilteredMovies = filteredMovies.filter(
        (movie) => movie.duration <= 40
      );
      if (shotFilteredMovies.length === 0) {
        setIsNotFound({ title: "Ничего не найдено" });
        return;
      }
      setMovies(shotFilteredMovies);
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(shotFilteredMovies)
      );
      localStorage.setItem("search", search.film);
      localStorage.setItem(
        "checkedShotFilms",
        JSON.stringify(checkedShotFilms)
      );

      setIsNotFound(false);
      return;
    }
    setMovies(filteredMovies);
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    localStorage.setItem("search", search.film);
    localStorage.setItem("checkedShotFilms", JSON.stringify(checkedShotFilms));
    setIsNotFound(false);
  };
  const handleError = () => {
    setIsNotFound({
      title:
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
    });
    setIsLoading(false);
  };
  const onSubmitForm = (search) => {
    let allMovies = JSON.parse(localStorage.getItem("allMovies"));
    setIsLoading(true);

    if (!allMovies) {
      moviesApi
        .getInitialMovies()
        .then((moviesData) => {
          localStorage.setItem("allMovies", JSON.stringify(moviesData));

          setLoadMovies(moviesData);
          moviesFiltered(moviesData, search);
          setIsLoading(false);
        })
        .catch(handleError);
    } else {
      moviesFiltered(loadMovies, search);
      setIsLoading(false);
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
          isNotFound={isNotFound}
          // setIsLoading={setIsLoading}
        />
        <button className="movies__buttonAdd">Ещё</button>
      </section>
    </>
  );
};

export default Movies;
