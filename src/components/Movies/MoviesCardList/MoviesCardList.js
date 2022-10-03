import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

function MoviesCardList({
  onCardClick,
  movies,
  isLoading,
  loggedIn,
  onSubmit,
}) {
  return (
    <div className="moviesCardList">
      <ul className="moviesCardList__container">
        {isLoading ? (
          <Preloader />
        ) : (
          movies.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              // onCardClick={onCardClick}
              onCardClick={onCardClick}

            />
          ))
        )}
      </ul>
    </div>
  );
}

export default MoviesCardList;
