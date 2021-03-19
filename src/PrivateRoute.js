import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  globalConstants,
  ...props
}) => {
  // isLoggedIn in props please!

  const newProps = { ...props, ...globalConstants };

  return (
    <Route
      render={(props) =>
        isLoggedIn === true ? (
          <div id="mid-col" className="main-col">
            <Component {...newProps} />
          </div>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
