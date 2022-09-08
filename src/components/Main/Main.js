import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Promo from "../Main/Promo/Promo"
import NavTab from "../Main/NavTab/NavTab";
import AboutProject from "../Main/AboutProject/AboutProject";

function Main(props) {
  return (
    <>
      <Promo />
      <NavTab />
      <AboutProject />
    </>
  );

}

export default Main;
