//react-hook-form.com/advanced-usage
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import find from "../../../images/find.svg";
import findInInput from "../../../images/findInInput.svg";
import Form from "../../Form/Form";

const SearchForm = (props) => {
  const [film, setFilm] = React.useState("");


  function handleChangeFilm(e) {
    setFilm(e.target.value);
  }
  // const [data, setData] = useState({
  //   film: ""
  // });

  // const handleChange = (e) => {
  //   setData(e.target.value);
  //   // const { name, value } = e.target;
  //   // setData({
  //   //   ...data,
  //   //   [name]: value,
  //   // });
  // };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //  function handleSubmit(e) {
  //    e.preventDefault();
  //    console.log("ecac");
  //  }

  const onSubmit = (e) => {
    props.onSubmit(e);
    reset();
  };

  // const onSubmit = (data) => {
  //   const { film } = data;
  //   console.log(data);
  // };
const searchFromLocalStorage = localStorage.getItem("search");
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
          // defaultValue={searchFromLocalStorage || ""}
        />
        <span>
          {errors?.film?.type === "required" && (
            <p className="searchForm__errorState">Введите название фильма</p>
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
