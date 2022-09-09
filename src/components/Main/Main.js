import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Promo from "../Main/Promo/Promo"
import NavTab from "../Main/NavTab/NavTab";
import AboutProject from "../Main/AboutProject/AboutProject";
import Techs from "../Main/Techs/Techs";


function Main(props) {
  return (
    <>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
    </>
  );

}

export default Main;
