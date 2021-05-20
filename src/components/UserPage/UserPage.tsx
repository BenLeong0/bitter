import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AccountContext } from "../Account";
import "./UserPage.css";

import UserHeader from "./UserHeader";
import UserBitList from "./UserBitList";
import UserFollowing from "./components/UserFollowing";
import UserFollowers from "./components/UserFollowers";
import UserLikeList from "./UserLikeList";
import UserNotFound from "./UserNotFound";

import User from "../../Types/User";
import ContextProps from "../../Types/ContextProps";
import HttpService from "../core/HttpService";

const UserPage: React.FC<{}> = () => {
  const httpService = new HttpService();
  const [user, setUser] = useState<User>({ handle: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listState, setListState] = useState<any>(
    <UserBitList showReplies={false} />
  );

  document.title = (user.handle ? "@" + user.handle : "user") + " / Bitter";

  const { currHandle, setCurrHandle, myHandle, setIsFollowing }: ContextProps =
    useContext(AccountContext);

  const handle: string = useLocation().pathname.slice(3);

  // Database call for user by handle
  const fetchUser = async (handle: string) => {
    setIsLoading(true);
    updatePageState(0);

    let res = "/users";
    let queryParams = { handle, myHandle };
    let resp: any = await httpService.makeGetRequest(res, queryParams);

    if (resp.code === "getSuccess") {
      let user: User = JSON.parse(resp.user);
      setUser(user);
      setCurrHandle(user.handle);
      if (typeof user.isFollowing !== "undefined")
        setIsFollowing(user.isFollowing);
    } else {
      setUser({ handle: "" });
      setCurrHandle("");
      console.error(resp);
    }

    setIsLoading(false);
  };

  // Load info on mount
  useEffect(() => {
    fetchUser(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myHandle]);

  // Update when moving between user pages
  const history = useHistory();
  useEffect(() => {
    return history.listen((location) => {
      fetchUser(location.pathname.slice(3));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // }, [history]);

  // Change view between bits / bits+replies / following / followers / likes
  function updatePageState(stateId: number): void {
    if (stateId === 0) {
      // Posts
      setListState(<UserBitList showReplies={false} />);
    } else if (stateId === 1) {
      // Posts and replies
      setListState(<UserBitList showReplies={true} />);
    } else if (stateId === 2) {
      // following list
      setListState(<UserFollowing />);
    } else if (stateId === 3) {
      // followers list
      setListState(<UserFollowers />);
    } else if (stateId === 4) {
      // like list
      setListState(<UserLikeList />);
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="user-loader">
          <div className="loader" />
        </div>
      ) : (
        <div className="user-page">
          {currHandle !== "" ? (
            <>
              <UserHeader updatePageState={updatePageState} user={user} />
              {listState}
            </>
          ) : (
            <UserNotFound handle={handle} />
          )}
        </div>
      )}
    </>
  );
};

export default UserPage;
