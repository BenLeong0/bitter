import { React, useState, useEffect } from "react";
import "./usersuggestions.css";
import UserSuggestion from "./UserSuggestion";

const UserSuggestions = () => {
  const [suggestedUsers, updateSuggestions] = useState([]);

  // Fetch 3 random users from the database
  const fetchSuggestions = async () => {
    const data = await fetch("http://localhost:8000/user-suggestions/get");
    const items = await data.json();
    updateSuggestions(items);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="user-suggestions">
      <div className="user-suggestions-title">Suggested users</div>
      {suggestedUsers.map((user) => (
        <UserSuggestion {...user} key={user.handle} />
      ))}
      <div className="user-suggestions-reroller">
        <button onClick={fetchSuggestions}> Reroll </button>
      </div>
    </div>
  );
};

export default UserSuggestions;
