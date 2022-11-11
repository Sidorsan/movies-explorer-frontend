import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";

const Login = ({ onLogin }) => {
  const [values, setValues] = useState({ email: "", password: "" });
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { email, password } = data;
  //   if (!email || !password) {
  //     return;
  //   }
  //   onLogin({ email, password });
  // };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
   const resetForm = useCallback(
     (newValues = {}, newErrors = {}, newIsValid = false) => {
       setValues(newValues);
       setErrors(newErrors);
       setIsValid(newIsValid);
     },
     [setValues, setErrors, setIsValid]
   );

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      const { password, email } = values;
      onLogin({ password, email });
    }
  };

  return (
    <section className="login">
      <div className="login__header">
        <a href="/">
          <img src={logo} alt="Логотип" className="login__logo" />
        </a>
        <h2 className="login__title">Рады видеть!</h2>
      </div>

      <Form
        name="login"
        buttonSubmitTitle="Войти"
        // onSubmit={handleSubmit(onSubmit)}
        onSubmit={handleSubmit}
        questionAboutRegistration="Ещё не зарегистрированы?"
        link="signup"
        linkTitle="Регистрация"
        isValid={isValid}
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
            required
          />
          <span>
            <p className="form__input_errorState">{errors.email}</p>
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
export default Login;
