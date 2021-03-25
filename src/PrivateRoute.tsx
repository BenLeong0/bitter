import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AccountContext } from "./components/Account";

interface Props {
  Component: any;
  path: string;
}

const PrivateRoute: React.FC<Props> = ({ Component, path }) => {
  // isLoggedIn in props please!
  const { isLoggedIn }: { isLoggedIn: boolean } = useContext(AccountContext);

  return (
    <Route
      render={() =>
        isLoggedIn === true ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
