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
import union_confirm from "../../images/union_confirm.svg";
import union_fail from "../../images/union_fail.svg";
function App() {
  let location = useLocation();
  const [isPopapNotFoundOpen, setIsPopapNotFoundOpen] = useState(false);
  const [dataPopapNotFound, setDataPopapNotFound] = useState({
    title: "",
    subtitle: "",
    buttonTitle: "",
  });

  const [currentUser, setCurrentUser] = useState({});
  // const [movies, setMovies] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then(setLoggedIn(true)).catch(handleError);
      history.push(location.pathname);
    }
  };
  const [saveMovies, setSaveMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = useState([]);
  const [isNotFound, setIsNotFound] = React.useState({
    title: "",
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loadMovies, setLoadMovies] = React.useState(
    JSON.parse(localStorage.getItem("allMovies")) || []
  );
  const [checkedShotFilms, setCheckedShotFilms] = React.useState(
    localStorage.getItem("checkedShotFilms") === "true"
  );

  useEffect(() => {
    handleTokenCheck();
    // checkId();
  }, []);

  useEffect(() => {
    // if (loggedIn) {
    // setIsloading(true);
    mainApi.getInitialMovies().then((movies) => {
      setSavedMovies(movies);
      // setIsloading(false);
    });
    // .catch(handleError);
    // }
  }, [saveMovies]);

  // useEffect(() => {
  //   console.log("работаю");
  //   if (loggedIn) {
  //     history.push("/movies");
  //   } else {
  //     history.push("/signin");
  //   }
  // }, [loggedIn]);

  const handleError = () => {
    setDataPopapNotFound({
      title: "404",
      subtitle: "Страница не найдена",
      buttonTitle: "Назад",
    });
    setIsPopapNotFoundOpen(!isPopapNotFoundOpen);
  };

  function closeAllPopups() {
    setIsPopapNotFoundOpen(false);
  }

  const handleLogin = ({ email, password }) => {
    auth
      .authorize({ email, password })
      .then((data) => {
        if (!data) {
          return handleError;
        }
        if (data) {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("userEmail", email);

          history.push("/movies");
        }
      })
      .then(handleTokenCheck)
      .catch(handleError);
  };

  useEffect(() => {
    if (loggedIn) {
      // setIsloading(true);

      mainApi
        .getInitialUser()
        .then((userData) => {
          setCurrentUser(userData);
          // setIsloading(false);
        })
        .catch(handleError);
    }
  }, [loggedIn]);

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
      .then(() => {
        handleLogin({ email, password });
        console.log(email, password);
        // history.push("/movies");
      })
      .catch(handleError);
  };

  // const handleLogaout = () => {
  //   setLoggedIn(false);
  //   localStorage.removeItem("jwt");
  //   localStorage.removeItem("userEmail");
  // };

  function handleCardClick(movie) {
    mainApi
      .getInitialMovies()
      .then((arr) => {
        let hasId = arr.find((o) => o.movieId === (movie.id || movie.movieId));

        if (hasId) {
          mainApi.deleteMovies(hasId._id);
          return checkId();
        }
        mainApi.postInitialMovies(movie);

        checkId();
      })

      .catch(handleError);
  }

  function checkId() {
    mainApi
      .getInitialMovies()
      .then((arr) => {
        setSaveMovies(arr);
      })
      .catch(handleError);
  }
  console.log(saveMovies);

  const handleChange = () => {
    setCheckedShotFilms(!checkedShotFilms);
  };

  const handleErrorNotFound = () => {
    setIsNotFound({
      title:
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
    });
    setIsLoading(false);
  };

  const onSubmitForm = (search) => {
    if (location.pathname === "/movies") {
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
          .catch(handleErrorNotFound);
      } else {
        moviesFiltered(loadMovies, search);
        setIsLoading(false);

      }

      return;
    } else { mainApi.getInitialMovies().then((movies) => {

      console.log(movies);
    });} }



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

    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    localStorage.setItem("search", search.film);
    localStorage.setItem("checkedShotFilms", JSON.stringify(checkedShotFilms));
    setIsNotFound(false);
    displayedMoviesChange();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        {/* <Header loggedIn={loggedIn} onLogout={handleLogaout} /> */}

        {/* <Header /> */}
        {location.pathname !== "/signin" && location.pathname !== "/signup" ? (
          <Header />
        ) : null}

        <Switch>
          {/* <ProtectedRoute */}
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
          <Route path="/profile">
            <Profile />
          </Route>

          <ProtectedRoute
            path="/movies"
            component={Movies}
            // movies={movies}
            isLoading={isLoading}
            loggedIn={loggedIn}
            movies={movies}
            onCardClick={handleCardClick}
            handleError={handleError}
            isNotFound={isNotFound}
            onSubmitForm={onSubmitForm}
            handleAddButton={handleAddButton}
            handleChange={handleChange}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            // isLoading={isLoading}
            savedMovies={savedMovies}
            onCardClick={handleCardClick}
            loggedIn={loggedIn}
            onSubmitForm={onSubmitForm}
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

// export default App;
export default withRouter(App);
