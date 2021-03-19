import React from "react";
import "./OptionsBox.css";
import OptionLink from "./OptionLink";
import HomeLogo from "./home.svg";
import UserLogo from "./user.svg";
import SettingsLogo from "./settings.svg";

const OptionsBox = (props) => {
  class Option {
    constructor(title, link, logo, requireLogin) {
      this.title = title;
      this.link = link;
      this.logo = logo;
      this.requireLogin = requireLogin;
    }
  }

  const optionList = [
    new Option("Home", "/home", HomeLogo, false),
    new Option("My Page", "/me", UserLogo, true),
    new Option("Settings", "/settings", SettingsLogo, true),
  ];

  return (
    <div className="options-box">
      {optionList.map((option) => (
        <OptionLink key={option.title} {...option} />
      ))}
    </div>
  );
};

export default OptionsBox;
