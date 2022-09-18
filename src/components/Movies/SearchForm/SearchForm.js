import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import find from "../../../images/find.svg";

const Movies = () => {
  const [data, setData] = useState({
    email: "",
    firstName: "",
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
    <div className="movies">
      <section className="movies__search">
        <form onSubmit={handleSubmit(onSubmit)} className="movies__form">
          <input
            className="movies__form_input"
            placeholder="Фильм"
            id="film"
            name="film"
            onChange={handleChange}
            {...register("film", {
              required: true,
              minLength: 2,
              maxLength: 20,
            })}
          />
          <span>
            {errors?.film?.type === "required" && (
              <p className="errorState">Это поле необходимо заполнить</p>
            )}
            {errors?.film?.type === "maxLength" && (
              <p className="errorState">
                Название не должно быть длиннее 20 символов
              </p>
            )}
            {errors?.film?.type === "minLength" && (
              <p className="errorState">
                Название не должно быть меньше 2 символов
              </p>
            )}
          </span>
        </form>
        <button type="submit" onSubmit={handleSubmit} className="movies__find">
          <img src={find} alt="Лупа"  />
        </button>
      </section>
    </div>
  );
};
export default Movies;
