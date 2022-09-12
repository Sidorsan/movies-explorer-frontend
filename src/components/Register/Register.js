import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
import { useForm } from "react-hook-form";

// const Register = ({ onRegister }) => {
const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   {
  //     const { password, email, firstName } = data;
  //     // onRegister({ password, email, firstName });
  //   }

  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   {
  //     const { password, email, name } = data;
  //     onRegister({ password, email, name });
  //   }

  // };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { password, email, firstName } = data;
    console.log(data);
  };

  return (
    <div className="register">
      <img src={logo} alt="Логотип" className="register__logo" />
      <p className="register__welcome">Добро пожаловать!</p>

      {/* <form onSubmit={handleSubmit} className="form"> */}
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label className="form__input_label">Имя</label>
        <input
          className="form__input"
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
          <p className="errorState">Имя не может быть длиннее 20 символов</p>
        )}
        {errors?.firstName?.type === "minLength" && (
          <p className="errorState">Имя не может быть меньше 2 символов</p>
        )}

        <label className="form__input_label">E-mail</label>
        <input
          placeholder="Введите E-mail"
          className="form__input"
          id="email"
          name="email"
          type="email"
          // value={data.email}
          onChange={handleChange}
          {...register("email", {
            required: true,
          })}
        />

        <label className="form__input_label">Пароль</label>
        <input
          placeholder="Введите пароль"
          className="form__input"
          id="password"
          name="password"
          type="password"
          // value={data.password}
          onChange={handleChange}
          {...register("password", {
            required: true,
            minLength: 8,
          })}
        />
        {errors?.password?.type === "required" && (
          <p className="errorState">Это поле необходимо заполнить</p>
        )}
        {errors?.password?.type === "minLength" && (
          <p className="errorState">Пароль не может быть меньше 8 символов</p>
        )}

        <button
          type="submit"
          onSubmit={handleSubmit}
          className="form__submitButton"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p>
          Уже зарегистрированы?{" "}
          <span>
            <Link to="signin" className="register__signin_link">
              Войти
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
