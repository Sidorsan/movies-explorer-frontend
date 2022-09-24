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
    <section className="element">
      <ul className="element__container">
        {/* поменять местами Preloader и cards.map */}
        {isLoading ? (
          cards.map((card) => (
            <MoviesCard
              key={card._id}
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
    </section>
  );
}

export default MoviesCardList;
