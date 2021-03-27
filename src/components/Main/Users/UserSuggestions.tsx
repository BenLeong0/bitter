import React, { useState, useEffect, useContext } from "react";
import "./usersuggestions.css";
import UserSuggestion from "./UserSuggestion";
import { AccountContext } from "../../Account";

import User from "../../../Types/User";
// interface User {
//   user_id: string;
//   handle?: string;
//   display_name?: string;
//   created_on?: string;
//   bio?: string;
//   follower_count?: number;
//   following_count?: number;
// }

const UserSuggestions: React.FC<{}> = () => {
  const [suggestedUsers, updateSuggestions] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    API_URL,
    isLoggedIn,
  }: { API_URL: string; isLoggedIn: boolean } = useContext(AccountContext);

  // Fetch 3 random users from the database
  const fetchSuggestions = async () => {
    setIsLoading(true);
    const data = await fetch(`${API_URL}user-suggestions/get`);
    const items: Array<User> = await data.json();
    updateSuggestions(items);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <div className="user-suggestions">
      <div className="user-suggestions-title">Suggested users</div>
      {isLoading ? (
        <div className="user-suggestions-loader">
          <div className="loader" />
        </div>
      ) : (
        <>
          {suggestedUsers.map((user) => (
            <UserSuggestion {...user} key={user.handle} />
          ))}
          <div className="user-suggestions-reroller">
            <button onClick={fetchSuggestions}> Reroll </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSuggestions;
