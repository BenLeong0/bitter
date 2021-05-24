import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AccountContext } from "../Account";
import "./UserPage.css";

import UserHeader from "./UserHeader/UserHeader";
import UserBitList from "./UserBitList";
import UserFollowing from "./UserFollowList/UserFollowing";
import UserFollowers from "./UserFollowList/UserFollowers";
import UserLikeList from "./UserLikeList";

import User from "../../Types/User";
import ContextProps from "../../Types/ContextProps";
import UserService from "../core/UserService";

const UserPage: React.FC<{}> = () => {
  const userService = new UserService();
  const [user, setUser] = useState<User>({ handle: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listState, setListState] = useState<any>(
    <UserBitList showReplies={false} />
  );

  document.title = (user.handle ? "@" + user.handle : "user") + " / Bitter";

  const { currHandle, setCurrHandle, myHandle, setIsFollowing }: ContextProps =
    useContext(AccountContext);

  const handle: string = useLocation().pathname.slice(3);
  useEffect(() => {
    fetchUser(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myHandle]);

  const updateUser = (user: User) => {
    setUser(user);
    setCurrHandle(user.handle);
    if (typeof user.isFollowing !== "undefined")
      setIsFollowing(user.isFollowing);
  };

  const fetchUser = async (handle: string) => {
    setIsLoading(true);
    updatePageState(0);

    await userService
      .fetchUser(handle, myHandle)
      .then((user) => updateUser(user))
      .catch(() => updateUser({ handle: "" }));

    setIsLoading(false);
  };

  // Update when moving between user pages
  const history = useHistory();
  useEffect(() => {
    return history.listen((location) => {
      fetchUser(location.pathname.slice(3));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updatePageState(stateId: number): void {
    switch (stateId) {
      case 0:
        setListState(<UserBitList showReplies={false} />);
        break;
      case 1:
        setListState(<UserBitList showReplies={true} />);
        break;
      case 2:
        setListState(<UserFollowing />);
        break;
      case 3:
        setListState(<UserFollowers />);
        break;
      case 4:
        setListState(<UserLikeList />);
        break;
      default:
        setListState(<UserBitList showReplies={false} />);
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
            <div className="user-not-found">
              User <span className="user-not-found-handle">@{handle}</span>{" "}
              could not be found.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserPage;
