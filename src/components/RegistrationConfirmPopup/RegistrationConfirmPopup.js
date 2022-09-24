import React from "react";

function RegistrationConfirmPopup({ data, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_register-confirm ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popap__container">
        <h2 className="popup__title">{data.title}</h2>
        <p className="popap__subtitle">{data.subtitle}</p>
      </div>

      <button className="popup__button" onClick={onClose}>
        {data.buttonTitle}
      </button>
    </div>
  );
}

export default RegistrationConfirmPopup;
