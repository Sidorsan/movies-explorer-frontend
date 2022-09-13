import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoDiploma.svg";
import { useForm } from "react-hook-form";

const Profile = ({ onLogin }) => {
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
      <p className="register__welcome">Привет, Александр!</p>

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
