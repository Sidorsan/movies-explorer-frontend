import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Promo from "../Main/Promo/Promo"
import NavTab from "../Main/NavTab/NavTab";

function Main(props) {
  return (
    <>
      <Promo />
      <NavTab />
    </>
  );

}

export default Main;
