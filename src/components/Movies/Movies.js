import React, { useEffect, useState } from "react";
import mainApi from "../../utils/MainApi";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/SearchForm/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";


const Movies = ({
  onCardClick,
  loggedIn,
  isLoading,
  movies,
  isNotFound,
  onSubmitForm,
  handleAddButton,
  handleChange,
  savedMovies,
}) => {

  const [isButtonAddVisble, setIsButtonAddVisble] = useState(true);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("filteredMovies"))) {
      setIsButtonAddVisble(
        JSON.parse(localStorage.getItem("filteredMovies")).length !==
          movies.length
      );
    }
  }, [movies]);

  return (
    <>
      <section className="movies">
        <div className="movies__searchAndFilter">
          <SearchForm onSubmit={onSubmitForm} />
          <FilterCheckbox onChange={handleChange} />
        </div>

        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          onCardClick={onCardClick}
          loggedIn={loggedIn}
          // onSubmit={onSubmitForm}
          isNotFound={isNotFound}
          // setIsLoading={setIsLoading}
          savedMovies={savedMovies}
        />
        <button
          className={`movies__buttonAdd ${
            isButtonAddVisble ? "" : "movies__buttonAdd_hidden"
          }`}
          onClick={handleAddButton}
        >
          Ещё
        </button>
      </section>
    </>
  );
};

export default Movies;
