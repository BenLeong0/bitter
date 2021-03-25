import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Admin from "./pages/Admin";
import { Account } from "./components/Account";
import "./App.css";

// Persistent
import LeftColumn from "./components/Main/LeftColumn";
import RightColumn from "./components/Main/RightColumn";

// Pages
import Timeline from "./pages/Timeline";
import UserPage from "./pages/UserPage";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./PrivateRoute";

const App: React.FC<{}> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [myHandle, setMyHandle] = useState<string>("");

  return (
    <Account
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      myHandle={myHandle}
      setMyHandle={setMyHandle}
    >
      <Router>
        <div className="App">
          <LeftColumn />

          <div id="mid-col" className="main-col">
            <Switch>
              {/* Login page (redirect if logged in) */}
              <Route
                path="/login"
                render={() =>
                  isLoggedIn === true ? (
                    <Redirect to={{ pathname: "/home" }} />
                  ) : (
                    <Login setMyHandle={setMyHandle} />
                  )
                }
              />

              {/* Registration page (redirect if logged in) */}
              <Route
                path="/register"
                render={() =>
                  isLoggedIn === true ? (
                    <Redirect to={{ pathname: "/home" }} />
                  ) : (
                    <Register />
                  )
                }
              />

              {/* Home page and redirects */}
              <Route path="/home" exact render={() => <Timeline />} />
              <Route
                exact
                path="/"
                render={() => <Redirect to={{ pathname: "/home" }} />}
              />
              <Route
                path="/bitter_react"
                render={() => <Redirect to={{ pathname: "/home" }} />}
              />

              {/* Admin page */}
              <PrivateRoute path="/admin" Component={Admin} />

              {/* Settings page */}
              <PrivateRoute path="/settings" Component={Settings} />

              {/* Current user page */}
              <Route
                path="/me"
                render={() =>
                  isLoggedIn === true ? (
                    <Redirect to={{ pathname: `/u/${myHandle}` }} />
                  ) : (
                    <Redirect to={{ pathname: "/login" }} />
                  )
                }
              />

              {/* General user page */}
              <Route path="/u/:handle" render={() => <UserPage />} />
            </Switch>
          </div>

          <RightColumn />
        </div>
      </Router>
    </Account>
  );
};

export default App;
