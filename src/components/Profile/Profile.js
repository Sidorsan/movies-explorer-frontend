import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      <form onSubmit={handleSubmit(onSubmit)} className="profile__form">
        <div className="profile__form_line">
          <label className="profile__form_label">Имя</label>
          <input
            className="profile__form_input"
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
        </div>
        {errors?.firstName?.type === "required" && (
          <p className="errorState">Это поле необходимо заполнить</p>
        )}
        {errors?.firstName?.type === "maxLength" && (
          <p className="errorState">Имя не должно быть длиннее 20 символов</p>
        )}
        {errors?.firstName?.type === "minLength" && (
          <p className="errorState">Имя не должно быть меньше 2 символов</p>
        )}
        <div className="profile__form_line">
          <label className="profile__form_label">E-mail</label>
          <input
            placeholder="Введите E-mail"
            className="profile__form_input"
            id="email"
            name="email"
            type="email"
            // value={data.email}
            onChange={handleChange}
            {...register("email", {
              required: true,
            })}
          />
        </div>
        {errors?.email?.type === "required" && (
          <p className="errorState">Это поле необходимо заполнить</p>
        )}
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="profile__form_submitButton"
        >
          Редактировать
        </button>
        <button className="profile__form_exitAccountButton">
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
};
export default Profile;
