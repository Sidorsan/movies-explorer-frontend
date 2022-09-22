import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  onCardClick,
  onCardSave,
  onCardDelete,
  cards,
  isLoading,
  loggedIn,
}) {
  console.log(cards);
  return (
    <main>
      <section className="element">
        <ul className="element__container">
          {/* поменять местами Preloader и cards.map */}
          {isLoading ? (
            cards.map((card) => (
              <MoviesCard
                key={card._id}
                card={card}
                // onCardClick={onCardClick}
                onCardSave={onCardSave}
                // onCardDelete={onCardDelete}
              />
            ))
          ) : (
            <Preloader />
          )}
        </ul>
      </section>
    </main>
  );
}

export default MoviesCardList;
