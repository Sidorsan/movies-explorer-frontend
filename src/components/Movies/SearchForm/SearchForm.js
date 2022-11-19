import React from "react";
import { useLocation } from "react-router-dom";
import find from "../../../images/find.svg";
const SearchForm = ({ onSubmit }) => {
  let location = useLocation();
  const [values, setValues] = React.useState(localStorage.search
    ? JSON.parse(localStorage.search)
    : "");
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(
    localStorage.getItem("search") ? true : false
  );

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      [name]: target.validationMessage,
    });
       setIsValid(target.closest(".searchForm__form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      const { film } = values;
      onSubmit({ film });
    }
  };



  const searchFromLocalStorage = localStorage.search
    ? JSON.parse(localStorage.search).film
    : "";

  return (
    <div className="searchForm">
      <form
        onSubmit={handleSubmit}
        className="searchForm__form"
        name="searchForm__form"
      >
        <input
          className="searchForm__input"
          placeholder="Фильм"
          id="film"
          name="film"
          onChange={handleChange}
          defaultValue={searchFromLocalStorage}
          required
        />
        <span>
          <p className="searchForm__errorState">{errors.film}</p>
        </span>

        <button
          type="submit"
          className={`searchForm__submitButton ${
            !isValid ? "searchForm__submitButton_notActiv" : ""
          }`}
          disabled={!isValid ? true : false}
        >
          <img src={find} alt="Лупа" />
        </button>
      </form>
    </div>
  );
};
export default SearchForm;
