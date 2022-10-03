import React from "react";

const FilterCheckbox = ({onChange}) => {

  const handleClick = () => {
   onChange(true);
  };
  return (
    <div className="filterCheckbox">
      <input
        className="filterCheckbox__checkbox"
        type="checkbox"
        onChange={handleClick}
      ></input>
      <h2 className="filterCheckbox__title">Короткометражки</h2>
    </div>
  );
};
export default FilterCheckbox;
