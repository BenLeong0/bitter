import { React, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  DefaultRoute,
  Switch,
} from "react-router-dom";
// import Home from "./pages/Home";
import Admin from "./pages/Admin";
import "./App.css";

// Persistent
import OptionsBox from "./components/Main/Options/OptionsBox";
import FindUser from "./components/Main/Users/FindUser";
import UserSuggestions from "./components/Main/Users/UserSuggestions";
import AppTitle from "./components/Main/AppTitle/AppTitle";

// Pages
import Timeline from "./pages/Timeline";
import UserPage from "./pages/UserPage";

const App = (props) => {
  const backend_url = "http://77.100.149.123:8000/";
  const [currId, setCurrId] = useState(0);
  const [myId, setMyId] = useState(1);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <Router>
      <div className="App">
        <div id="left-col" className="main-col">
          <AppTitle />
          <OptionsBox />
        </div>
        <div id="mid-col" className="main-col">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Timeline {...props} backend_url={backend_url} />
              )}
            />
            <Route
              path="/home"
              render={(props) => (
                <Timeline {...props} backend_url={backend_url} />
              )}
            />
            <Route
              path="/bitter_react"
              render={(props) => (
                <Timeline {...props} backend_url={backend_url} />
              )}
            />
            <Route path="/admin" component={Admin} />
            <Route
              path="/u/:handle"
              render={(props) => (
                <UserPage
                  {...props}
                  currId={currId}
                  setCurrId={setCurrId}
                  myId={myId}
                  isFollowing={isFollowing}
                  setIsFollowing={setIsFollowing}
                  backend_url={backend_url}
                />
              )}
            />
          </Switch>
        </div>
        <div id="right-col" className="main-col">
          <FindUser />
          <UserSuggestions
            currId={currId}
            myId={myId}
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
            backend_url={backend_url}
          />
        </div>
      </div>

      <div>
        {/* <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/admin">Admin Page</Link>
          </li>
        </ul> */}
      </div>
    </Router>
  );
};

export default App;
