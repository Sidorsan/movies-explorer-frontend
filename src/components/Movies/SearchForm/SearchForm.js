
//react-hook-form.com/advanced-usage
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import find from "../../../images/find.svg";
import findInInput from "../../../images/findInInput.svg";
import Form from "../../Form/Form";

const SearchForm = (props) => {
  const [data, setData] = useState({
    film: ""
  });
console.log(data);
  const handleChange = (e) => {
    setData(e.target.value);
    // const { name, value } = e.target;
    // setData({
    //   ...data,
    //   [name]: value,
    // });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   const { film } = data;
  //   console.log(data);
  // };

  return (
    <div className="searchForm">
      <form onSubmit={handleSubmit(props.onSubmit)} className="searchForm__form">
        <input
          className="searchForm__input"
          placeholder="Фильм"
          id="film"
          name="film"
          // onChange={handleChange}
          {...register("film", {
            required: true,
          })}
        />
        <span>
          {errors?.film?.type === "required" && (
            <p className="searchForm__errorState">Введите название фильма</p>
          )}
        </span>

        <button
          type="submit"
          // onSubmit={handleSubmit}
          className="searchForm__submitButton"
        >
          <img src={find} alt="Лупа" />
        </button>
      </form>

    </div>
  );
};
export default SearchForm;
