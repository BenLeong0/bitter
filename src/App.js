import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  DefaultRoute,
} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

const App = (props) => {
  return (
    <Router>
      <div>
        {/* <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/admin">Admin Page</Link>
          </li>
        </ul> */}
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/bitter_react" component={Home} />
        <Route path="/admin" component={Admin} />
      </div>
    </Router>
  );
};

export default App;
