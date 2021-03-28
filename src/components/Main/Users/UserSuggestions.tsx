import React, { useState, useEffect, useContext } from "react";
import "./usersuggestions.css";
import UserSuggestion from "./UserSuggestion";
import { AccountContext } from "../../Account";

import User from "../../../Types/User";

const UserSuggestions: React.FC<{}> = () => {
  const [suggestedUsers, updateSuggestions] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { myHandle }: { myHandle: string } = useContext(AccountContext);

  // Fetch 3 random users from the database
  const fetchSuggestions = async () => {
    setIsLoading(true);

    const data = await fetch(
      `https://7z39hjjfg1.execute-api.eu-west-2.amazonaws.com/dev/users/suggested?myHandle=${myHandle}`
    );
    const items: Array<User> = await data.json();
    updateSuggestions(items);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myHandle]);

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
