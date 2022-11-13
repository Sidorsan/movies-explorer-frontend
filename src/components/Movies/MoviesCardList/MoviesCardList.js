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
  savedMovies,

}) {
  return (
    <div className="moviesCardList">
      <ul className="moviesCardList__container">
        {
          isLoading ? (
          <Preloader />
        ) : isNotFound ? (
          <p className="notFoundTitle">{isNotFound.title}</p>
            ) :
              (
              movies.map((movie) => (

            <MoviesCard
              key={movie.id ? movie.id : movie._id}
              movie={movie}
              onCardClick={onCardClick}
              savedMovies={savedMovies}
            />
          ))
          )
        }
      </ul>
    </div>
  );
}
export default MoviesCardList;
