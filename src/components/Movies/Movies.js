import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const Movies = ({ cards, isLoading, onCardclick, loggedIn }) => {


  return (
    <>
        <section className="movies">
          <div className="movies__searchAndFilter">
            <SearchForm />
            <FilterCheckbox />
          </div>

          <MoviesCardList
            cards={cards}
            isLoading={isLoading}
            onCardclick={onCardclick}
            loggedIn={loggedIn}
          />
          <button className="movies__buttonAdd">Ещё</button>
        </section>

    </>
  );
};

export default Movies;
