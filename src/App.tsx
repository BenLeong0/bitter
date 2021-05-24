import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Admin from "./components/Admin/Admin";
import { Account } from "./components/Account";
import "./App.css";

// Persistent
import LeftColumn from "./components/SidebarLeft/LeftColumn";
import RightColumn from "./components/SidebarRight/RightColumn";

// Pages
import PageNotFound from "./components/Shared/PageNotFound";
import Timeline from "./components/Timeline/Timeline";
import UserPage from "./components/UserPage/UserPage";
import BitPage from "./components/BitPage/BitPage";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
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
      <Router basename="/">
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
              <Route
                path="/home"
                exact
                render={() => (
                  <Timeline timelineType="timeline" key="timeline" />
                )}
              />
              <Route
                path="/"
                exact
                render={() => <Redirect to={{ pathname: "/home" }} />}
              />

              {/* All posts (redirect if not logged in)*/}
              <Route
                path="/all"
                exact
                render={() =>
                  isLoggedIn === true ? (
                    <Timeline timelineType="all" key="all" />
                  ) : (
                    <Redirect to={{ pathname: "/home" }} />
                  )
                }
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

              {/* General bit page */}
              <Route path="/b/:post_id" render={() => <BitPage />} />

              {/* 404 page */}
              <Route component={PageNotFound} />
            </Switch>
          </div>

          <RightColumn />
        </div>
      </Router>
    </Account>
  );
};

export default App;
