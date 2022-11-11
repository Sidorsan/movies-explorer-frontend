import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import pikcher from "../../../images/Pikcher.png";
import { useLocation } from "react-router-dom";
import mainApi from "../../../utils/MainApi";
function MoviesCard(props) {
  let location = useLocation();
  const handleCardButtonClick = () => {
    props.onCardClick(props.movie);
  };

  // const handleDeleteClick = () => {
  //   props.onCardDelete(props.card._id);
  // };
  // const [saveMovies, setSaveMovies] = useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  // const isSaved =  mainApi.getInitialMovies().then((arr) => {
  //   arr.find((o) => o.movieId === props.movie.id)
  //     ? setSaveMovies(true)
  //     : setSaveMovies(false);
  // });

  // useEffect(() => {
// console.log(props.savedMovies);
//     props.savedMovies.find(
//       (o) => o.movieId === props.movie.id && o.owner === currentUser._id
//     )
//     // mainApi.getInitialMovies().then((arr) => {
//     //   arr.find((o) => o.movieId === props.movie.id
//     //     && o.owner === currentUser._id
//     //   )
//         ? setSaveMovies(true)
//         : setSaveMovies(false);
//     // // });
//   }, [handleCardButtonClick]);
const isSaved = props.savedMovies.find(
  (o) => o.movieId === props.movie.id && o.owner === currentUser._id
);

  const MoviesButtonClassName = `moviesCard__Button ${
    isSaved ? "moviesCard__Button_active" : " "
  } ${
    location.pathname === "/saved-movies" ? "moviesCard__Button_delite" : " "
  }`;

  return (
    <li className="moviesCard">
      <img
        // src={`https://api.nomoreparties.co${props.movie.image.url}`}
        src={
          props.movie.image.url
            ? `https://api.nomoreparties.co${props.movie.image.url}`
            : props.movie.image
        }
        alt={props.movie.description}
        className="moviesCard__image"
      />
      <div className="moviesCard__Content">
        <h2 className="moviesCard__title">{props.movie.nameRU}</h2>
        <button
          className={MoviesButtonClassName}
          onClick={handleCardButtonClick}
          type="button"
        ></button>
      </div>
      <div className="moviesCard__duration">{props.movie.duration}</div>
    </li>
  );
}
export default MoviesCard;
