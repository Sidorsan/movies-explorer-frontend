import React from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import find from "../../../images/find.svg";
const SearchForm = (props) => {
  let location = useLocation();
  const [film, setFilm] = React.useState("");

  function handleChangeFilm(e) {
    setFilm(e.target.value);
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (e) => {
    props.onSubmit(e);
    reset();
  };
  const searchFromLocalStorage = location.pathname === "/movies" ?
    localStorage.getItem("search") : ''
  return (
    <div className="searchForm">
      <form onSubmit={handleSubmit(onSubmit)} className="searchForm__form">
        <input
          className="searchForm__input"
          placeholder="Фильм"
          id="film"
          name="film"
          onChange={handleChangeFilm}
          {...register("film", {
            required: true,
          })}
          defaultValue={searchFromLocalStorage || ""}
        />
        <span>
          {errors?.film?.type === "required" && (
            <p className="searchForm__errorState">
              Нужно ввести ключевое слово
            </p>
          )}
        </span>

        <button type="submit" className="searchForm__submitButton">
          <img src={find} alt="Лупа" />
        </button>
      </form>
    </div>
  );
};
export default SearchForm;
