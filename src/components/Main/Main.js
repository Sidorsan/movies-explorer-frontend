import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Promo from "../Main/Promo/Promo"
import NavTab from "../Main/NavTab/NavTab";
import AboutProject from "../Main/AboutProject/AboutProject";
import Techs from "../Main/Techs/Techs";
import AboutMe from "../Main/AboutMe/AboutMe";
import Portfolio from "../Main/Portfolio/Portfolio";


function Main(props) {
  return (
    <>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </>
  );

}

export default Main;
