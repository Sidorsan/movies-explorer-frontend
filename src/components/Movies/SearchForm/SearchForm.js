import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import find from "../../../images/find.svg";
import Form from "../../Form/Form";
const Movies = () => {
  const [data, setData] = useState({
    film: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { film } = data;
    console.log(data);
  };
  return (
    <div className="searchForm">
      <form onSubmit={handleSubmit(onSubmit)} className="searchForm__form">
        <input
          className="searchForm__input"
          placeholder="Фильм"
          id="film"
          name="film"
          onChange={handleChange}
          {...register("film", {
            required: true,
          })}
        />
        <span>
          {errors?.film?.type === "required" && (
            <p className="searchForm__errorState">Введите название фильма</p>
          )}
        </span>

        <button
          type="submit"
          // onSubmit={handleSubmit}
          className="searchForm__submitButton"
        >
          <img src={find} alt="Лупа" />
        </button>
      </form>

    </div>
  );
};
export default Movies;
