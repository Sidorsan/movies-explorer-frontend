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

function App() {
  let location = useLocation();
  const [isPopapNotFoundOpen, setIsPopapNotFoundOpen] = useState(false);
  const [dataPopapNotFound, setDataPopapNotFound] = useState({
    title: "",
    subtitle: "",
    buttonTitle: "",
  });

  const [currentUser, setCurrentUser] = useState({});

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

  // useEffect(() => {
  //   location.pathname === "/" ||
  //   location.pathname === "/movies" ||
  //   location.pathname === "/saved-movies" ||
  //   location.pathname === "/signin" ||
  //   location.pathname === "/signup" ||
  //   location.pathname === "/profile"
  //     ? console.log("yes")
  //     : handleError()
  // }, [location]);

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

  const handleLoginUpdate = ({ firstName, email }) => {
    mainApi
      .patchUser({ firstName, email })
      .then((data) => {
        if (!data) {
          return handleError;
        }
        if (data) {
          localStorage.setItem("userEmail", email);
          alert("Данные успешно изменены");
        }
      })
      .catch(handleError);
  };

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getInitialUser()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch(handleError);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getInitialMovies()
        .then((movies) => {
          setSaveMovies(movies.filter((o) => o.owner === currentUser._id));
        })
        .catch(handleError);
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
      .then(() => {
        handleLogin({ email, password });
      })
      .catch(handleError);
  };

  function handleCardClick(movie) {
    let hasIdAndOwner = saveMovies.find(
      (o) =>
        o.movieId === (movie.id || movie.movieId) && o.owner === currentUser._id
    );
    if (hasIdAndOwner) {
      mainApi.deleteMovies(hasIdAndOwner._id).then(() => {
        setSaveMovies((movies) =>
          movies.filter((c) => c._id !== hasIdAndOwner._id)
        );
      });
      // return;
    } else {
      mainApi
        .postInitialMovies(movie)
        .then(
          mainApi.getInitialMovies().then((movies) => {
            setSaveMovies(movies.filter((o) => o.owner === currentUser._id));
          })
        )
        .catch(handleError);
      // setSaveMovies(saveMovies.map((c) => (c.movieId === movie.id ? movie :c)) )
      // .then(
      //   mainApi.getInitialMovies().then((mov) => {
      //     console.log(mov);
      //     setSaveMovies(
      //       mov.filter((o) => o.owner === currentUser._id)
      //     );
      //   })
      // )
      // .then(console.log(saveMovies))

      // console.log(movie);
      // const saveMovie1 = []
      // const arr = () => {saveMovies.map((c) => (c.movieId === movie.id ? console.log(movie) :console.log(c))) };
      // arr()
    }

    // mainApi
    //   .getInitialMovies()
    //   .then((arr) => {
    //     let hasIdAndOwner = arr.find(
    //       (o) =>
    //         o.movieId === (movie.id || movie.movieId) &&
    //         o.owner === currentUser._id
    //     );

    //     if (hasIdAndOwner) {
    //       mainApi.deleteMovies(hasIdAndOwner._id).then(() => {
    //         setSaveMovies((movies) =>
    //           movies.filter((c) => c._id !== hasIdAndOwner._id)
    //         );
    //       });

    //       return;
    //     }
    //     mainApi.postInitialMovies(movie);
    //   })
    //   .catch(handleError);
  }

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
    } else {
      moviesFiltered(saveMovies, search);
    }
  };

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
      if (location.pathname === "/movies") {
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
      } else {
        setSaveMovies(shotFilteredMovies);
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
      localStorage.setItem("search", search.film);
      localStorage.setItem(
        "checkedShotFilms",
        JSON.stringify(checkedShotFilms)
      );
      setIsNotFound(false);
      displayedMoviesChange();
    } else {
      setSaveMovies(filteredMovies);
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
          <Header />
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
            // handleError={handleError}
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
