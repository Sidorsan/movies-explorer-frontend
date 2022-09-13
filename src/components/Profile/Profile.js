import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
import { useForm } from "react-hook-form";

const Profile = ({ onLogin }) => {
  //  const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { email, password } = data;
  //   if (!email || !password) {
  //     return;
  //   }
  //   onLogin({ email, password });
  // };

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
    const { firstName, email } = data;
    console.log(data);
  };

  return (
    <div className="profile">
      <p className="profile__welcome">Привет, Александр!</p>
      <form onSubmit={handleSubmit(onSubmit)} className="form_profile">
        <div className="form_profile__line">
          <label className="form_profile__label">Имя</label>
          <input
            className="form_profile__input"
            placeholder="Введите имя"
            id="firstName"
            name="firstName"
            // value={data.firstName}
            onChange={handleChange}
            {...register("firstName", {
              required: true,
              minLength: 2,
              maxLength: 20,
            })}
          />
          {errors?.firstName?.type === "required" && (
            <p className="errorState">Это поле необходимо заполнить</p>
          )}
          {errors?.firstName?.type === "maxLength" && (
            <p className="errorState">Имя не должно быть длиннее 20 символов</p>
          )}
          {errors?.firstName?.type === "minLength" && (
            <p className="errorState">Имя не должно быть меньше 2 символов</p>
          )}
        </div>
        <div className="form_profile__line">
          <label className="form_profile__label">E-mail</label>
          <input
            placeholder="Введите E-mail"
            className="form_profile__input"
            id="email"
            name="email"
            type="email"
            // value={data.email}
            onChange={handleChange}
            {...register("email", {
              required: true,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="errorState">Это поле необходимо заполнить</p>
          )}
        </div>

        <button
          type="submit"
          onSubmit={handleSubmit}
          className="form__submitButton"
        >
          Зарегистрироваться
        </button>
      </form>
      {/* <ul className="profile__userData">
        <li className="profile__userData_line">
          <p className="profile__userData_value">Имя</p>
          <p className="profile__userData_value">Александр</p>
        </li>
        <li className="profile__userData_line">
          <p className="profile__userData_value">E-mail</p>
          <p className="profile__userData_value">pochta@yandex.ru</p>
        </li>
      </ul>
      <Link to="signin" className="register__signin_link">
        Войти
      </Link> */}
      <div className="register__signin">
        <p>
          Ещё не зарегистрированы?{" "}
          <span>
            <Link to="signup" className="register__signin_link">
              Регистрация
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};
export default Profile;
