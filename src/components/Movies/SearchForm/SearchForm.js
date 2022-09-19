import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import find from "../../../images/find.svg";
import Form from "../../Form/Form";
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
    <div className="searchForm">
      <Form
        name="searchForm"
        buttonSubmitTitle={<img src={find} alt="Лупа" />}
        onSubmit={handleSubmit(onSubmit)}
        questionAboutRegistration=""
        link="#"
        linkTitle="Выйти из аккаунта"
      >
        <section className="form__section form__section_profile">
          {" "}
          <label className="form__input_label form__input_label_profile ">
            Имя
          </label>
          <input
            placeholder="Введите имя"
            className="form__input form__input_profile"
            id="firstName"
            name="firstName"
            type="firstName"
            onChange={handleChange}
            {...register("firstName", {
              required: true,
            })}
          />
          <span>
            {errors?.firstName?.type === "required" && (
              <p className="form__input_errorState form__input_errorState_profile">
                Это поле необходимо заполнить
              </p>
            )}
            {errors?.firstName?.type === "maxLength" && (
              <p className="form__input_errorState form__input_errorState_profile">
                Имя не должно быть длиннее 20 символов
              </p>
            )}
            {errors?.firstName?.type === "minLength" && (
              <p className="form__input_errorState form__input_errorState_profile">
                Имя не должно быть меньше 2 символов
              </p>
            )}
          </span>
        </section>

      </Form>
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
          <img src={find} alt="Лупа" />
        </button>
      </section>
    </div>
  );
};
export default Movies;
