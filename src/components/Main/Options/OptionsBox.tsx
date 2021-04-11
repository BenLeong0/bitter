import React, { useContext } from "react";
import "./OptionsBox.css";
import OptionLink from "./OptionLink";
import UserBox from "./OptionsUserBox";

import HomeLogo from "./home.svg";
import UserLogo from "./user.svg";
import SettingsLogo from "./settings.svg";
import LoginLogo from "./login.svg";
import RegisterLogo from "./register.svg";

import { AccountContext } from "../../Account";
import ContextProps from "../../../Types/ContextProps";

const OptionsBox: React.FC<{}> = () => {
  const { isLoggedIn }: ContextProps = useContext(AccountContext);

  class Option {
    title: string;
    link: string;
    logo: string; // hmmm

    public constructor(title: string, link: string, logo: string) {
      this.title = title;
      this.link = link;
      this.logo = logo;
    }
  }

  const homeOption = new Option("Home", "/home", HomeLogo);
  const userOption = new Option("My Page", "/me", UserLogo);
  const settingsOption = new Option("Settings", "/settings", SettingsLogo);
  const loginOption = new Option("Login", "/login", LoginLogo);
  const registerOption = new Option("Register", "/register", RegisterLogo);

  return (
    <div className="options-box">
      <OptionLink {...homeOption} />
      {isLoggedIn ? (
        <>
          {/* My page/settings if logged in */}
          <OptionLink {...userOption} />
          <OptionLink {...settingsOption} />
          <hr />
          <UserBox />
        </>
      ) : (
        <>
          {/* Login/Register if not logged in */}
          <OptionLink {...loginOption} />
          <OptionLink {...registerOption} />
        </>
      )}
    </div>
  );
};

export default OptionsBox;
