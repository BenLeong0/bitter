import React from "react";
import { Link } from "react-router-dom";

const OptionLink = (props) => {
  const classes = `option ${props.index === 0 ? "first-option" : ""}`;

  return (
    <div className={classes}>
      <Link to={props.link}>
        <div className="option-logo-box">
          <img src={props.logo} alt="logo" className="option-logo" />
        </div>
        <div className="option-title"> {props.title}</div>
      </Link>
    </div>
  );
};

export default OptionLink;
