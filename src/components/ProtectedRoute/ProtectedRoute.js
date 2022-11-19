import React from "react";
import { Route, Redirect, Link } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {

  return (
    <Route>
      {() => (props.loggedIn ? <Component {...props} /> : <Redirect to="/" />)}
    </Route>
  );
};
export default ProtectedRoute;
