import React, { useEffect, useState } from "react";
import {
  useLocation,
  withRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PopapNotFound from "../PopapNotFound/PopapNotFound";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import { MovieDurationShotFilm } from "../Constant/Constant";
import { QuantityMoviesAddButtonScreenResolutionMore1279 } from "../Constant/Constant";
import { QuantityMoviesAddButtonScreenResolutionLess1279 } from "../Constant/Constant";
import { QuantityVisibleMoviesScreenResolutionMore319 } from "../Constant/Constant";
import { QuantityVisibleMoviesScreenResolutionMore767 } from "../Constant/Constant";
import { QuantityVisibleMoviesScreenResolutionMore1279 } from "../Constant/Constant";

function App() {
  let location = useLocation();
  const [isPopapNotFoundOpen, setIsPopapNotFoundOpen] = useState(false);
  const [dataPopapNotFound, setDataPopapNotFound] = useState({
    title: "404",
    subtitle: "Страница не найдена",
    buttonTitle: "Назад",
  });

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(setLoggedIn(true))
        .catch((error) => {
          handleError(error);
          handleLogOut();
        });
      history.push(location.pathname);
      return;
    }
    handleLogOut();
  };
  const [saveMovies, setSaveMovies] = useState([]);
  const [saveMoviesVisible, setSaveMoviesVisible] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = useState([]);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loadMovies, setLoadMovies] = React.useState(
    JSON.parse(localStorage.getItem("allMovies")) || []
  );
  const [checkedShotFilms, setCheckedShotFilms] = React.useState(
    localStorage.getItem("checkedShotFilms") === "true"
  );

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    location.pathname === "/" ||
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/profile"
      ? setIsNotFound(false)
      : handleError({
          title: "404",
          subtitle: "Страница не существует",
          buttonTitle: "Назад",
        });
  }, [location]);

  const handleError = (props) => {
    setDataPopapNotFound({
      title: `${props.status ? props.status : "404"}`,
      subtitle: `${
        props.statusText ? props.statusText : "Страница не найдена"
      }`,
      buttonTitle: "Назад",
    });
    setIsPopapNotFoundOpen(true);
  };

  function closeAllPopups() {
    setIsPopapNotFoundOpen(false);
  }

  const handleLogin = ({ email, password }) => {
    auth
      .authorize({ email, password })
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("userEmail", email);
          history.push("/movies");
        }
      })
      .then(handleTokenCheck)
      .catch((error) =>
        error.status === 401
          ? alert("Пользователь не найден или не зарегистрирован")
          : handleError(error)
      );
  };

  const handleLoginUpdate = ({ firstName, email }) => {
    mainApi
      .patchUser({ firstName, email })
      .then((data) => {
        if (data) {
          localStorage.setItem("userEmail", email);
          alert("Данные успешно изменены");
        }
      })
      .catch((error) => handleError(error));
  };

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getInitialUser()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => handleError(error));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi
        .getInitialMovies()
        .then((movies) => {
          const arr = movies.filter((o) => o.owner === currentUser._id);
          setSaveMovies(arr);
          setSaveMoviesVisible(arr);
          setIsLoading(false);
        })

        .catch((error) => handleError(error));
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem("visibleMovies")) {
      setIsLoading(true);
      setMovies(JSON.parse(localStorage.getItem("visibleMovies")));
      displayedMoviesChange();
      setIsLoading(false);
      setIsNotFound(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWindowWidth(window.innerWidth), 100);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  const handleRegister = ({ password, email, firstName }) => {
    auth
      .register({ password, email, firstName })
      .then((data) => {
        if (data) {
          handleLogin({ email, password });
        }
      })

      .catch((error) =>
        error.status === 409
          ? alert("Пользователь с таким Email уже зарегистрирован")
          : handleError(error)
      );
  };

  function handleCardClick(movie) {
    let hasIdAndOwner = saveMovies.find(
      (o) =>
        o.movieId === (movie.id || movie.movieId) && o.owner === currentUser._id
    );
    if (hasIdAndOwner) {
      mainApi
        .deleteMovies(hasIdAndOwner._id)
        .then(() => {
          let arr = saveMovies.filter((c) => c._id !== hasIdAndOwner._id);
          setSaveMovies(arr);
          if (checkedShotFilms) {
            const newArr = arr.filter(
              (m) => m.duration <= MovieDurationShotFilm
            );
            setSaveMoviesVisible(newArr);
            return;
          }
          setSaveMoviesVisible(arr);
        })
        .catch((error) => handleError(error));
      return;
    } else {
      mainApi
        .postInitialMovies(movie)
        .then((newMovie) => {
          setMovies((newCards) =>
            newCards.map((c) => (c === newMovie.movieId ? newMovie.movieId : c))
          );
          let arr = [...saveMovies, newMovie];
          setSaveMovies(arr);
          setSaveMoviesVisible(arr);
        })
        .catch((error) => handleError(error));
    }
  }

  const handleChange = () => {
    setCheckedShotFilms(!checkedShotFilms);
  };

  useEffect(() => {
    if (localStorage.search)
      if (location.pathname === "/movies") {
        moviesFiltered(loadMovies, JSON.parse(localStorage.search));
      }
  }, [checkedShotFilms]);
  // console.log(JSON.parse(localStorage.search));

  const handleErrorNotFound = () => {
    setIsNotFound({
      title:
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
    });
    setIsLoading(false);
  };

  const onSubmitForm = (search) => {
    setIsLoading(true);
    if (location.pathname === "/movies") {
      const allMovies = JSON.parse(localStorage.getItem("allMovies"));

      if (!allMovies) {
        moviesApi
          .getInitialMovies()
          .then((moviesData) => {
            localStorage.setItem("allMovies", JSON.stringify(moviesData));
            setLoadMovies(moviesData);
            moviesFiltered(moviesData, search);
            setIsLoading(false);
          })
          .catch(handleErrorNotFound);
      } else {
        moviesFiltered(loadMovies, search);
        setIsLoading(false);
      }
      return;
    } else {
      moviesFiltered(saveMovies, search);
      setIsLoading(false);
    }
  };

  const displayedMoviesChange = () => {
    if (windowWidth > 319) {
      let arr = JSON.parse(localStorage.getItem("filteredMovies")).slice(
        0,
        QuantityVisibleMoviesScreenResolutionMore319
      );
      setMovies(arr);
      localStorage.setItem("visibleMovies", JSON.stringify(arr));
    }
    if (windowWidth > 767) {
      let arr = JSON.parse(localStorage.getItem("filteredMovies")).slice(
        0,
        QuantityVisibleMoviesScreenResolutionMore767
      );
      setMovies(arr);
      localStorage.setItem("visibleMovies", JSON.stringify(arr));
    }
    if (windowWidth > 1279) {
      let arr = JSON.parse(localStorage.getItem("filteredMovies")).slice(
        0,
        QuantityVisibleMoviesScreenResolutionMore1279
      );
      setMovies(arr);
      localStorage.setItem("visibleMovies", JSON.stringify(arr));
    }
  };

  const handleAddButton = () => {
    if (windowWidth > 1279) {
      let arr = JSON.parse(localStorage.getItem("filteredMovies")).slice(
        0,
        movies.length + QuantityMoviesAddButtonScreenResolutionMore1279
      );
      setMovies(arr);
      localStorage.setItem("visibleMovies", JSON.stringify(arr));
    } else {
      let arr = JSON.parse(localStorage.getItem("filteredMovies")).slice(
        0,
        movies.length + QuantityMoviesAddButtonScreenResolutionLess1279
      );
      setMovies(arr);
      localStorage.setItem("visibleMovies", JSON.stringify(arr));
    }
  };

  const filterBySimbols = (movie, search) => {
    return (
      movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(search.toLowerCase())
    );
  };

  const moviesFiltered = (data, search) => {
    console.log(search);
    const filteredMovies = data.filter((movie) =>
      filterBySimbols(movie, search.film)
    );
    if (filteredMovies.length === 0) {
      setIsNotFound({ title: "Ничего не найдено" });
      if (location.pathname === "/movies") {
        localStorage.removeItem("search");
        localStorage.removeItem("filteredMovies");
        localStorage.removeItem("visibleMovies");
      }

      return;
    }
    if (checkedShotFilms) {
      const shotFilteredMovies = filteredMovies.filter(
        (movie) => movie.duration <= MovieDurationShotFilm
      );
      if (shotFilteredMovies.length === 0) {
        setIsNotFound({ title: "Ничего не найдено" });
        if (location.pathname === "/movies") {
          localStorage.removeItem("search");
          localStorage.removeItem("filteredMovies");
          localStorage.removeItem("visibleMovies");
        }
        return;
      }
      if (location.pathname === "/movies") {
        localStorage.setItem(
          "filteredMovies",
          JSON.stringify(shotFilteredMovies)
        );
        displayedMoviesChange();

        localStorage.search = JSON.stringify({ film: search.film });
        localStorage.setItem(
          "checkedShotFilms",
          JSON.stringify(checkedShotFilms)
        );
        setIsNotFound(false);
        return;
      } else {
        setSaveMoviesVisible(shotFilteredMovies);
        setIsNotFound(false);
        localStorage.setItem(
          "checkedShotFilms",
          JSON.stringify(checkedShotFilms)
        );
        return;
      }
    }
    if (location.pathname === "/movies") {
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      localStorage.search = JSON.stringify({ film: search.film });
      localStorage.setItem(
        "checkedShotFilms",
        JSON.stringify(checkedShotFilms)
      );

      displayedMoviesChange();
      setIsNotFound(false);
      return;
    } else {
      setSaveMoviesVisible(filteredMovies);
      setIsNotFound(false);
      localStorage.setItem(
        "checkedShotFilms",
        JSON.stringify(checkedShotFilms)
      );
    }
  };
  const handleLogOut = () => {
    history.push("/");
    localStorage.removeItem("jwt");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("visibleMovies");
    localStorage.removeItem("search");
    localStorage.removeItem("checkedShotFilms");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("allMovies");
    setMovies([]);
    setLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        {location.pathname !== "/signin" && location.pathname !== "/signup" ? (
          <Header loggedIn={loggedIn} />
        ) : null}
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/signup">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register onRegister={handleRegister} />
            )}
          </Route>
          <Route path="/signin">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </Route>

          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onLogin={handleLoginUpdate}
            logOut={handleLogOut}
          />
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLoading={isLoading}
            loggedIn={loggedIn}
            movies={movies}
            onCardClick={handleCardClick}
            isNotFound={isNotFound}
            onSubmitForm={onSubmitForm}
            handleAddButton={handleAddButton}
            handleChange={handleChange}
            savedMovies={saveMovies}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            savedMovies={saveMovies}
            savedMoviesVisible={saveMoviesVisible}
            onCardClick={handleCardClick}
            loggedIn={loggedIn}
            onSubmitForm={onSubmitForm}
            isNotFound={isNotFound}
            handleChange={handleChange}
            isLoading={isLoading}
          />
        </Switch>
        {location.pathname !== "/signin" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/profile" ? (
          <Footer />
        ) : null}
        <PopapNotFound
          data={dataPopapNotFound}
          isOpen={isPopapNotFoundOpen}
          onClose={closeAllPopups}
        />
      </>
    </CurrentUserContext.Provider>
  );
}
export default withRouter(App);
