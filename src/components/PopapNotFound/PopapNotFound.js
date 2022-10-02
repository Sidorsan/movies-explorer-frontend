import React from "react";

function PopapNotFound({ data, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <h2 className="popup__title">{data.title}</h2>
      <p className="popap__subtitle">{data.subtitle}</p>

      <button className="popup__button" onClick={onClose}>
        {data.buttonTitle}
      </button>
    </div>
  );
}

export default PopapNotFound;
