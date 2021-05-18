import React, { useState, useEffect, useContext } from "react";
import "./usersuggestions.css";
import UserSuggestion from "./UserSuggestion";
import { AccountContext } from "../../Account";

import User from "../../../Types/User";
import ContextProps from "../../../Types/ContextProps";
import HttpService from "../../core/HttpService";

const UserSuggestions: React.FC<{}> = () => {
  const httpService = new HttpService();

  const [suggestedUsers, updateSuggestions] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const { myHandle }: ContextProps = useContext(AccountContext);

  // Fetch 5 random users from the database
  const fetchSuggestions = async () => {
    setIsLoading(true);

    let res = `/users/suggested?myHandle=${myHandle}`;
    let resp: any = await httpService.makeGetRequest(res);

    if (resp.code === "getSuccess") {
      setFetchError(false);
      const users: Array<User> = JSON.parse(resp.users);
      updateSuggestions(users);
    } else {
      updateSuggestions([]);
      setFetchError(true);
      console.error(resp);
    }

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
          {fetchError ? (
            <div className="user-suggestions-error">
              Oops, looks like an error occurred...
            </div>
          ) : (
            <></>
          )}
          <div className="user-suggestions-reroller">
            <button onClick={fetchSuggestions}> Reroll </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSuggestions;
