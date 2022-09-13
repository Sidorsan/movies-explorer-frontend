import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
import { useForm } from "react-hook-form";

const Login = ({ onLogin }) => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { email, password } = data;
  //   if (!email || !password) {
  //     return;
  //   }
  //   onLogin({ email, password });
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { password, email } = data;
    console.log(data);
  };

  return (
    <div className="register">
      <a href="/">
        <img src={logo} alt="Логотип" className="register__logo" />
      </a>
      <p className="register__welcome">Рады видеть!</p>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label className="form__input_label">E-mail</label>
        <input
          className="form__input"
          placeholder="Email"
          id="useremailname"
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
        <label className="form__input_label">Пароль</label>
        <input
          className="form__input"
          placeholder="Пароль"
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
          Войти
        </button>
      </form>
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
export default Login;
