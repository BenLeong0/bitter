import React from "react";
import { Link } from "react-router-dom";

interface Option {
  title: string;
  link: string;
  logo: string;
}

const OptionLink: React.FC<Option> = ({ title, logo, link }) => {
  return (
    <div className="option">
      <Link to={link}>
        <div className="option-logo-box">
          <img src={logo} alt="logo" className="option-logo" />
        </div>
        <div className="option-title">{title}</div>
      </Link>
    </div>
  );
};

export default OptionLink;
