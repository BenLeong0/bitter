import "./App.css";
import OptionsBox from "./components/options/OptionsBox";
import Timeline from "./components/timeline/Timeline";
import FindUser from "./components/users/FindUser";
import UserSuggestions from "./components/users/UserSuggestions";
import AppTitle from "./components/AppTitle/AppTitle";

function App() {
  return (
    <div className="App">
      <div id="left-col" className="main-col">
        <AppTitle />
        <OptionsBox />
      </div>
      <div id="mid-col" className="main-col">
        <Timeline />
      </div>
      <div id="right-col" className="main-col">
        <FindUser />
        <UserSuggestions />
      </div>
    </div>
  );
}

export default App;
