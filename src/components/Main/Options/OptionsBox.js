import React from "react";
import "./OptionsBox.css";
import OptionLink from "./OptionLink";
import HomeLogo from "./home.svg";
import UserLogo from "./user.svg";
import SettingsLogo from "./settings.svg";

const OptionsBox = (props) => {
  class Option {
    constructor(title, link, logo) {
      this.title = title;
      this.link = link;
      this.logo = logo;
    }
  }

  const optionList = [
    new Option("Home", "/home", HomeLogo),
    new Option("My Page", `/me`, UserLogo),
    new Option("Settings", "/settings", SettingsLogo),
  ];

  return (
    <div className="options-box">
      {optionList.map((option, index) => (
        <OptionLink key={option.title} index={index} {...option} />
      ))}
    </div>
  );
};

export default OptionsBox;
