import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import pikcher from "../../../images/Pikcher.png";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
  let location = useLocation();
  const handleCardButtonClick = () => {
    props.onCardClick(props.movie);
  };

  // const handleDeleteClick = () => {
  //   props.onCardDelete(props.card._id);
  // };

  const currentUser = React.useContext(CurrentUserContext);
  // const isOwn = props.card.owner === currentUser._id;
  const isSaved = props.movie.owner === currentUser._id;



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
