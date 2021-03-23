import React from "react";

import FindUser from "./Users/FindUser";
import UserSuggestions from "./Users/UserSuggestions";

const RightColumn: React.FC<{}> = () => {
  return (
    <div id="right-col" className="main-col">
      <FindUser />
      <UserSuggestions />
    </div>
  );
};

export default RightColumn;
