import React, { useEffect, useState } from "react";

import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Movies = ({
  // onCardclick,
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
  const [savedMovies, setSavedMovies] = useState([]);

  const [isNotFound, setIsNotFound] = React.useState({
    title: "",
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isButtonAddVisble, setIsButtonAddVisble] = useState(true);
const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWindowWidth(window.innerWidth), 100);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  const displayedMoviesChange = () => {
    if (windowWidth > 319) {
      let arr = JSON.parse(localStorage.getItem("filteredMovies")).slice(0, 5);
      setMovies(arr);
      localStorage.setItem("visibleMovies", JSON.stringify(arr));
    }
    if (windowWidth > 767) {
      let arr = JSON.parse(localStorage.getItem("filteredMovies")).slice(0, 8);
      setMovies(arr);
      localStorage.setItem("visibleMovies", JSON.stringify(arr));
    }
    if (windowWidth > 1279) {
      let arr = JSON.parse(localStorage.getItem("filteredMovies")).slice(0, 12);
      setMovies(arr);
      localStorage.setItem("visibleMovies", JSON.stringify(arr));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("visibleMovies")) {
      setIsLoading(true);
      setMovies(JSON.parse(localStorage.getItem("visibleMovies")));
      // displayedMoviesChange();

      setIsLoading(false);
      setIsNotFound(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("filteredMovies"))) {
      setIsButtonAddVisble(
        JSON.parse(localStorage.getItem("filteredMovies")).length !==
          movies.length
      );
    }
  }, [movies]);

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
      const shotFilteredMovies = filteredMovies.filter(
        (movie) => movie.duration <= 40
      );
      if (shotFilteredMovies.length === 0) {
        setIsNotFound({ title: "Ничего не найдено" });
        return;
      }
      // setMovies(shotFilteredMovies);
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(shotFilteredMovies)
      );
      displayedMoviesChange();

      localStorage.setItem("search", search.film);
      localStorage.setItem(
        "checkedShotFilms",
        JSON.stringify(checkedShotFilms)
      );

      setIsNotFound(false);
      return;
    }
    // setMovies(filteredMovies);
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    localStorage.setItem("search", search.film);
    localStorage.setItem("checkedShotFilms", JSON.stringify(checkedShotFilms));
    setIsNotFound(false);
    displayedMoviesChange();
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
  const handleAddButton = () => {
    if (windowWidth > 1279) {
      let arr = JSON.parse(localStorage.getItem("filteredMovies")).slice(
        0,
        movies.length + 3
      );
      setMovies(arr);
      localStorage.setItem("visibleMovies", JSON.stringify(arr));
    } else {
      let arr = JSON.parse(localStorage.getItem("filteredMovies")).slice(
        0,
        movies.length + 2
      );
      setMovies(arr);
      localStorage.setItem("visibleMovies", JSON.stringify(arr));
    }
  };

  function handleCardSave(movie) {
    console.log(movie);

    mainApi.getInitialMovies().then((newMovie) => { setSavedMovies(newMovie) }).then(console.log(savedMovies));
    const isSave = savedMovies.some((i) => i.owner === currentUser.id);
    console.log(isSave);
    // const isSaved = movie.likes.some((i) => i._id === currentUser._id);
    // mainApi
    //   .postInitialMovies(movie)
      // .then((newMovie) => {
      //   setMovies((newMovie) =>
      //     newMovie.map((c) => (c._id === card._id ? newCard : c))
      //   );
      // })
      // .catch(handleError);
  }


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
          onCardClick={handleCardSave}
          loggedIn={loggedIn}
          onSubmit={onSubmitForm}
          isNotFound={isNotFound}
          // setIsLoading={setIsLoading}
        />
        <button
          className={`movies__buttonAdd ${
            isButtonAddVisble ? "" : "movies__buttonAdd_hidden"
          }`}
          onClick={handleAddButton}
        >
          Ещё
        </button>
      </section>
    </>
  );
};

export default Movies;
