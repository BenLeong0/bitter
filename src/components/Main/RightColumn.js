import React from "react";

import FindUser from "./Users/FindUser";
import UserSuggestions from "./Users/UserSuggestions";

const RightColumn = (props) => {
  return (
    <div id="right-col" className="main-col">
      <FindUser />
      <UserSuggestions
        {...props} //- session info
        // setIsFollowing={setIsFollowing}
      />
    </div>
  );
};

export default RightColumn;
