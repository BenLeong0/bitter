import React from "react";
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
  return (
    <Router>
      <div className="App">
        <div id="left-col" className="main-col">
          <AppTitle />
          <OptionsBox />
        </div>
        <div id="mid-col" className="main-col">
          <Switch>
            <Route exact path="/" component={Timeline} />
            <Route path="/home" component={Timeline} />
            <Route path="/bitter_react" component={Timeline} />
            <Route path="/admin" component={Admin} />
            <Route path="/u/:handle" component={UserPage} />
          </Switch>
        </div>
        <div id="right-col" className="main-col">
          <FindUser />
          <UserSuggestions />
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
