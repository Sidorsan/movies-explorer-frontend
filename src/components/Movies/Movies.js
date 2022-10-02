import React, { useState } from "react";


import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

// const Movies = ({ cards, isLoading, onCardclick, loggedIn }) => {
const Movies = ({
  cards,
  isLoading,
  onCardclick,
  loggedIn,
  onSubmit,
  onClick,
}) => {

  const filterMovies = () => {
    return cards.filter((card) => {});
  };
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

console.log(checked);
  return (
    <>
      <section className="movies">
        <div className="movies__searchAndFilter">
          <SearchForm onSubmit={onSubmit} />
          <FilterCheckbox onChange={setChecked} />
        </div>

        <MoviesCardList
          cards={cards}
          isLoading={isLoading}
          onCardclick={onCardclick}
          loggedIn={loggedIn}
          onSubmit={onSubmit}
        />
        <button className="movies__buttonAdd">Ещё</button>
      </section>
    </>
  );
};

export default Movies;
