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
  const [selectedCard, setSelectedCard] = useState(null);
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

  useEffect(() => {
    handleTokenCheck();
  }, []);

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

  //

  const handleRegister = ({ password, email, firstName }) => {
    auth
      .register({ password, email, firstName })
      .then(() => {
        handleLogin({email, password});
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
            // isLoading={isLoading}
            loggedIn={loggedIn}
            // setIsloading={setIsloading}

            handleError={handleError}

          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}

            // isLoading={isLoading}
            loggedIn={loggedIn}
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
