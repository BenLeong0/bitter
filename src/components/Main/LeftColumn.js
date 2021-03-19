import React from "react";

import OptionsBox from "./Options/OptionsBox";
import AppTitle from "./AppTitle/AppTitle";

const LeftColumn = () => {
  return (
    <div id="left-col" className="main-col">
      <AppTitle />
      <OptionsBox />
    </div>
  );
};

export default LeftColumn;
