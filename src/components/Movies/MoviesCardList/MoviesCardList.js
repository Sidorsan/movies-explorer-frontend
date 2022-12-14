import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

function MoviesCardList({
  onCardClick,
  onCardDelete,
  cards,
  isLoading,
  loggedIn,
}) {
  return (
    <div className="moviesCardList">
      <ul className="moviesCardList__container">
        {/* поменять местами Preloader и cards.map */}
        {isLoading ? (
          cards.map((card) => (
            <MoviesCard
              key={card.id}
              card={card}
              // onCardClick={onCardClick}
              onCardClick={onCardClick}
              // onCardDelete={onCardDelete}
            />
          ))
        ) : (
          <Preloader />
        )}
      </ul>
    </div>
  );
}

export default MoviesCardList;
