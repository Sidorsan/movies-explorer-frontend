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
// import ImagePopup from "./ImagePopup";
import PopapNotFound from "../PopapNotFound/PopapNotFound";
import api from "../../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
// import EditProfilePopup from "./EditProfilePopup";
// import EditAvatarPopup from "./EditAvatarPopup";
// import AddPlacePopup from "./AddPlacePopup";

// import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import * as auth from "../../utils/auth";
import union_confirm from "../../images/union_confirm.svg";
import union_fail from "../../images/union_fail.svg";
function App() {
  let location = useLocation();
  // const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPopapNotFoundOpen, setPopapNotFoundOpen] = useState(false);
  const [dataPopapNotFound, setPopapNotFound] = useState({
    title: "",
    subtitle: "",
    buttonTitle: "",
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then(setLoggedIn(true)).catch(handleError);
    }
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     history.push("/movies");
  //   } else {
  //     history.push("/");
  //   }
  // }, [loggedIn]);

  const handleError = () => {
    setPopapNotFound({
      title: "404",
      subtitle: "Страница не найдена",
      buttonTitle: "Назад",
    });
    setPopapNotFoundOpen(!isPopapNotFoundOpen);
  };

  // function handleCardDelete(id) {
  //   api
  //     .deleteCard(id)
  //     .then(() => {
  //       setCards((cards) => cards.filter((c) => c._id !== id));
  //     })
  //     .catch(handleError);
  // }

  // function handleCardLike(card) {
  //   const isLiked = card.likes.some((i) => i === currentUser._id);
  //   api
  //     .changeLikeCardStatus(card._id, !isLiked)
  //     .then((newCard) => {
  //       setCards((newCards) =>
  //         newCards.map((c) => (c._id === card._id ? newCard : c))
  //       );
  //     })
  //     .catch(handleError);
  // }

  // function handleUpdateUser(userInfo) {
  //   api
  //     .setUserInfo(userInfo)
  //     .then((data) => {
  //       setCurrentUser(data);
  //       closeAllPopups();
  //     })
  //     .catch(handleError);
  // }

  // function handleUpdateAvatar(avatarInfo) {
  //   api
  //     .setAvatar(avatarInfo)
  //     .then((data) => {
  //       setCurrentUser(data);
  //       closeAllPopups();
  //     })
  //     .catch(handleError);
  // }

  // function handleAddPlaceSubmit(card) {
  //   api
  //     .postInitialCards(card)
  //     .then((newCard) => {
  //       setCards([newCard, ...cards]);
  //       closeAllPopups();
  //     })
  //     .catch(handleError);
  // }

  function closeAllPopups() {
    setPopapNotFoundOpen(false);
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
          setLoggedIn(true);
        }
      })
      .catch(handleError);
  };

  useEffect(() => {
    // if (loggedIn) {раскомментировать когда будет авторизация
    //   setIsloading(true);раскомментировать когда будет авторизация

    api
      .getAllNeededData()
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
        // setIsloading(false); раскомментировать когда будет авторизация
        setIsloading(true);
      })
      .catch(handleError);
    // }
    // }, [loggedIn]);раскомментировать когда будет авторизация
  }, []);

  const handleRegister = ({ password, email, firstName }) => {
    auth
      .register({ password, email, firstName })
      .then(() => {
        history.push("/signin");
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
            <Register onRegister={handleRegister} />
          </Route>
          {/* <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route> */}
          <Route path="/signin">
            {/* {loggedIn ? (
              <Redirect to="/movies" />
            ) : ( */}
            <Login onLogin={handleLogin} />
            {/* )} */}
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/movies">
            <Movies
              cards={cards}
              isLoading={isLoading}
              onCardclick={""}
              loggedIn={loggedIn}
            />
          </Route>

          {/* <ProtectedRoute
            path="/movies"
            component={Movies}
            cards={cards}
            isLoading={isLoading}
            loggedIn={loggedIn}
          /> */}

          <Route path="/saved-movies">
            <SavedMovies cards={cards} isLoading={isLoading} onCardclick={""} />
          </Route>
        </Switch>

        {/* <Footer /> */}
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
