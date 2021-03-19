import { React, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  DefaultRoute,
  Switch,
  Redirect,
} from "react-router-dom";
// import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { Account, AccountContext } from "./components/Account";
import "./App.css";

// Persistent
import OptionsBox from "./components/Main/Options/OptionsBox";
import FindUser from "./components/Main/Users/FindUser";
import UserSuggestions from "./components/Main/Users/UserSuggestions";
import AppTitle from "./components/Main/AppTitle/AppTitle";

import LeftColumn from "./components/Main/LeftColumn";
import RightColumn from "./components/Main/RightColumn";

// Pages
import Timeline from "./pages/Timeline";
import UserPage from "./pages/UserPage";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./PrivateRoute";

const App = (props) => {
  const API_URL = "http://localhost:8000/";
  const [currId, setCurrId] = useState(0);
  const [myId, setMyId] = useState(1);
  const [myHandle, setMyHandle] = useState("ben");
  const [isFollowing, setIsFollowing] = useState(false);
  const globalConstants = {
    currId,
    myId,
    isFollowing,
    API_URL,
    myHandle,
  };
  // Store all in cookies + context pls

  const isLoggedIn = false; // CHANGE!
  // const { isLoggedIn } = useContext(AccountContext)

  return (
    <Account>
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
                    <Login />
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
                  <Timeline isLoggedIn={isLoggedIn} {...globalConstants} />
                )}
              />
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
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                path="/admin"
                component={Admin}
              />

              {/* Settings page */}
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                path="/settings"
                component={Settings}
              />

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
              <Route
                path="/u/:handle"
                render={() => (
                  <UserPage
                    isLoggedIn={isLoggedIn}
                    {...globalConstants}
                    setCurrId={setCurrId}
                    setIsFollowing={setIsFollowing}
                  />
                )}
              />
            </Switch>
          </div>

          <RightColumn {...globalConstants} />
        </div>
      </Router>
    </Account>
  );

  //   return (
  //     <Router>
  //       <div className="App">
  //         <div id="left-col" className="main-col">
  //           <AppTitle />
  //           <OptionsBox />
  //         </div>
  //         <div id="mid-col" className="main-col">
  //           <Switch>
  //             <Route
  //               exact
  //               path="/"
  //               render={(props) => <Timeline {...props} {...globalConstants} />}
  //             />

  //             <Route
  //               path="/home"
  //               render={(props) => <Timeline {...props} {...globalConstants} />}
  //             />
  //             <Route
  //               path="/bitter_react"
  //               render={(props) => <Timeline {...props} {...globalConstants} />}
  //             />

  //             <Route path="/admin" component={Admin} />
  //             <Route path="/settings" component={Settings} />

  //             <Route exact path="/me">
  //               <Redirect to={`/u/${myHandle}`} />
  //             </Route>
  //             <Route
  //               path="/u/:handle"
  //               render={(props) => (
  //                 <UserPage
  //                   {...props}
  //                   {...globalConstants}
  //                   setCurrId={setCurrId}
  //                   setIsFollowing={setIsFollowing}
  //                 />
  //               )}
  //             />
  //           </Switch>
  //         </div>
  //         <div id="right-col" className="main-col">
  //           <FindUser />
  //           <UserSuggestions
  //             {...props}
  //             {...globalConstants}
  //             setIsFollowing={setIsFollowing}
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         {/* <ul>
  //           <li>
  //             <Link to="/">Home Page</Link>
  //           </li>
  //           <li>
  //             <Link to="/admin">Admin Page</Link>
  //           </li>
  //         </ul> */}
  //       </div>
  //     </Router>
  //   );
};

export default App;
