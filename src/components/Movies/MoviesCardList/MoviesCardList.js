import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

function MoviesCardList({
  onCardClick,
  movies,
  isLoading,
  loggedIn,
  onSubmit,
  isNotFound,
}) {
  return (
    <div className="moviesCardList">
      <ul className="moviesCardList__container">
        {isLoading ? (
          <Preloader />
        ) : isNotFound ? (
          <p className='notFoundTitle'>«Ничего не найдено»</p>
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
