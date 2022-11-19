import React, { useState, useCallback } from "react";
import logo from "../../images/logoDiploma.svg";
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
    setErrors({
      ...errors,
      [name]: target.validationMessage,
    });
    setIsValid(target.closest("form").checkValidity());
  };

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
            onChange={handleChange}
            pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
            required
          />
          <span>
            <p className="form__input_errorState">
              {errors.email === "Введите данные в указанном формате."
                ? "Введеные символы не соответствуют Email"
                : errors.email}
            </p>
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
