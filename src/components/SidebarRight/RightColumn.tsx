import React from "react";

import FindUser from "./FindUser/FindUser";
import UserSuggestions from "./UserSuggestions/UserSuggestions";

const RightColumn: React.FC<{}> = () => {
  return (
    <div id="right-col" className="main-col">
      <FindUser />
      <UserSuggestions />
    </div>
  );
};

export default RightColumn;
