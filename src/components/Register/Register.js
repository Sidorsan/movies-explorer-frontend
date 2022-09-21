import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";
// const Register = ({ onRegister }) => {
const Register = ({ onRegister }) => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { password, email, firstName } = data;
    onRegister({ password, email, firstName });
  };

  return (
    <div className="register">
      <a href="/">
        <img src={logo} alt="Логотип" className="register__logo" />
      </a>

      <h2 className="register__title">Добро пожаловать!</h2>
      <Form
        name="register"
        buttonSubmitTitle="Зарегистрироваться"
        onSubmit={handleSubmit(onSubmit)}
        questionAboutRegistration="Уже зарегистрированы?"
        link="signin"
        linkTitle="Войти"
      >
        <section className="form__section">
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
          <span>
            {errors?.firstName?.type === "required" && (
              <p className="form__input_errorState">
                Это поле необходимо заполнить
              </p>
            )}
            {errors?.firstName?.type === "maxLength" && (
              <p className="form__input_errorState">
                Имя не должно быть длиннее 20 символов
              </p>
            )}
            {errors?.firstName?.type === "minLength" && (
              <p className="form__input_errorState">
                Имя не должно быть меньше 2 символов
              </p>
            )}
          </span>
        </section>

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
          <span>
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
          </span>
        </section>
      </Form>
    </div>
  );
};

export default Register;
