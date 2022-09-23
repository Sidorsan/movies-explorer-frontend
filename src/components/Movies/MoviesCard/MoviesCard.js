import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import pikcher from "../../../images/Pikcher.png";

function MoviesCard(props) {



  // const handleCardClick = () => {
  //   props.onCardClick(props.card);
  // };
  const handleSaveClick = () => {
    props.onCardSave(props.card);
  };
  // const handleDeleteClick = () => {
  //   props.onCardDelete(props.card._id);
  // };

  const currentUser = React.useContext(CurrentUserContext);
   // const isOwn = props.card.owner === currentUser._id;
  const isSaved = props.card.owner === currentUser._id;

  const MoviesSaveButtonClassName = `moviesCard__saveButton ${
    isSaved ? "moviesCard__saveButton_active" : " "
  }`;
  return (
    <li className="moviesCard">
      <img
        src={props.card.image}
        alt={props.card.description}
        className="moviesCard__image"
      />
      <div className="moviesCard__Content">
        <h2 className="moviesCard__title">{props.card.description}</h2>
        <button
          className={MoviesSaveButtonClassName}
          onClick={handleSaveClick}
          type="button"
        ></button>
      </div>
      <div className="moviesCard__duration">{props.card.duration}</div>
    </li>
  );
}
export default MoviesCard;
