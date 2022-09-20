import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  isLoading,
}) {

  return (
    <main>
      <section className="element">
        <ul className="element__container">
          {isLoading ? (
            <Preloader />
          ) : (
              cards.map((card) => (

              <MoviesCard
                // key={card._id}
                // card={card}
                // onCardClick={onCardClick}
                // onCardLike={onCardLike}
                // onCardDelete={onCardDelete}
              />
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

export default MoviesCardList;
