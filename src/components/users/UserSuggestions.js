import { React, useState } from "react";
import "./usersuggestions.css";
import UserSuggestion from "./UserSuggestion";

const UserSuggestions = () => {
  class User {
    constructor(handle, displayName) {
      this.handle = handle;
      this.displayName = displayName;
    }
  }

  const userList = [
    new User("ben", "NoPressure1"),
    new User("sam", "GodFluxxy"),
    new User("isaac", "FireCapp"),
  ];

  const [suggestedUsers, updateSuggestions] = useState(userList);

  return (
    <div className="user-suggestions">
      <div className="user-suggestions-title">Suggested users</div>
      {suggestedUsers.map((user) => (
        <UserSuggestion {...user} key={user.handle} />
      ))}
      <div className="user-suggestions-reroller">
        <button>Reroll</button>
      </div>
    </div>
  );
};

export default UserSuggestions;
