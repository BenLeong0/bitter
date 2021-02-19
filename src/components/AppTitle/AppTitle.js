import React from "react";
import "./AppTitle.css";
import { Link } from "react-router-dom";

const AppTitle = () => {
  return (
    <div className="app-title-box">
      <Link to="/home">
        <div className="app-title">BitteR</div>
      </Link>
    </div>
  );
};

export default AppTitle;
