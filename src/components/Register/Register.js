import React, { useState, useCallback } from "react";
import logo from "../../images/logoDiploma.svg";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";

// const Register = ({ onRegister }) => {
const Register = ({ onRegister }) => {
  const [values, setValues] = React.useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    // console.log(name);
    // console.log(target.validationMessage);

  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   {
  //     const { password, email, firstName } = data;
  //     // onRegister({ password, email, firstName });
  //   }

  // };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },

  // } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      const { password, email, firstName } = values;
      onRegister({ password, email, firstName });
    }
  };

  // const onSubmit = (data) => {
  //   const { password, email, firstName } = data;
  //   onRegister({ password, email, firstName });
  // };

  return (
    <section className="register">
      <div className="register__header">
        <a href="/">
          <img src={logo} alt="Логотип" className="register__logo" />
        </a>

        <h2 className="register__title">Добро пожаловать!</h2>
      </div>

      <Form
        name="register"
        buttonSubmitTitle="Зарегистрироваться"
        // onSubmit={handleSubmit(onSubmit)}
        onSubmit={handleSubmit}
        questionAboutRegistration="Уже зарегистрированы?"
        link="signin"
        linkTitle="Войти"
        isValid={isValid}
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
            required
            minLength="2"
            maxLength="20"
            pattern="^[a-zA-Zа-яА-ЯЁё -]+$"
          />
          <span>
            <p className="form__input_errorState">
              {errors.firstName === "Введите данные в указанном формате."
                ? "Поле должно содержать только латиницу, кириллицу, пробел или дефис"
                : errors.firstName}
            </p>
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
            required
            // pattern="^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i"
          />
          <span>
            <p className="form__input_errorState">{errors.email}</p>
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
            required
            minLength="8"
          />
          <span>
            <p className="form__input_errorState">{errors.password}</p>
          </span>
        </section>
      </Form>
    </section>
  );
};

export default Register;
