import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";

const Register = ({ onRegister }) => {
  const [data, setData] = useState({
    name: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      const { password, email, name } = data;
      onRegister({ password, email, name });
    }
  };
  return (
    <div className="register">
      <img src={logo} alt="Логотип" className="register__logo" />
      <p className="register__welcome">Добро пожаловать!</p>

      <form onSubmit={handleSubmit} className="form form__register">
        <label className="form__input_label">Имя</label>
        <input
          className="form__input"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <label className="form__input_label">E-mail</label>
        <input
          className="form__input"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <label className="form__input_label">Пароль</label>
        <input
          className="form__input"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
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
