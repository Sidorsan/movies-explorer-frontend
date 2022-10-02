import React from "react";

const FilterCheckbox = (onChange) => {
  // console.log(onChange);
  const handleCardClick = () => {
    onChange(false);
  };
  return (
    <div className="filterCheckbox">
      <input
        className="filterCheckbox__checkbox"
        type="checkbox"
        // checked={!checked}
        onChange={handleCardClick}
        // onClick={handleCardClick}
      ></input>
      <h2 className="filterCheckbox__title">Короткометражки</h2>
    </div>
  );
};
export default FilterCheckbox;
