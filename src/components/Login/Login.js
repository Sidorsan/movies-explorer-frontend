import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";

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
    onLogin({ email, password });

  };

  return (
    <div className="login">
      <a href="/">
        <img src={logo} alt="Логотип" className="login__logo" />
      </a>
      <h2 className="login__title">Рады видеть!</h2>
      <Form
        name="login"
        buttonSubmitTitle="Войти"
        onSubmit={handleSubmit(onSubmit)}
        questionAboutRegistration="Ещё не зарегистрированы?"
        link="signup"
        linkTitle="Регистрация"
      >
        <section className="form__section">
          {" "}
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
          <span>
            {errors?.email?.type === "required" && (
              <p className="form__input_errorState">
                Это поле необходимо заполнить
              </p>
            )}
          </span>
        </section>
        <section className="form__section">
          <label className="form__input_label">Пароль</label>
          <input
            className="form__input"
            placeholder="Введите пароль"
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
            <p className="form__input_errorState">
              Это поле необходимо заполнить
            </p>
          )}
          {errors?.password?.type === "minLength" && (
            <p className="form__input_errorState">
              Пароль не может быть меньше 8 символов
            </p>
          )}
        </section>
      </Form>
    </div>
  );
};
export default Login;
