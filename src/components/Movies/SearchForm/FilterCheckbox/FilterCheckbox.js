import React from "react";
const FilterCheckbox = ({onChange}) => {
  const handleClick = () => {
   onChange(true);
  };
  let checked = localStorage.getItem("checkedShotFilms") === "true"
    ? true
    : false;
  return (
    <div className="filterCheckbox">
      <input
        className="filterCheckbox__checkbox"
        type="checkbox"
        defaultChecked={checked}
        onChange={handleClick}
      ></input>
      <h2 className="filterCheckbox__title">Короткометражки</h2>
    </div>
  );
};
export default FilterCheckbox;
