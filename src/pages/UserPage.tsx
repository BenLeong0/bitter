import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AccountContext } from "../components/Account";
import "../components/UserPage/UserPage.css";

import UserHeader from "../components/UserPage/UserHeader";
import UserBitList from "../components/UserPage/UserBitList";
import UserFollowing from "../components/UserPage/components/UserFollowing";
import UserFollowers from "../components/UserPage/components/UserFollowers";
import UserLikeList from "../components/UserPage/UserLikeList";
import UserNotFound from "../components/UserPage/UserNotFound";

import User from "../Types/User";
import ContextProps from "../Types/ContextProps";
// interface User {
//   user_id: string;
//   handle?: string;
//   display_name?: string;
//   created_on?: string;
//   bio?: string;
//   follower_count?: number;
//   following_count?: number;
// }

const UserPage: React.FC<{}> = () => {
  const [user, setUser] = useState<User>({ handle: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listState, setListState] = useState<any>(
    <UserBitList replies={false} />
  );

  document.title = (user.handle ? "@" + user.handle : "user") + " / Bitter";

  const {
    API_URL,
    currHandle,
    setCurrHandle,
    myHandle,
    setIsFollowing,
  }: ContextProps = useContext(AccountContext);

  const handle: string = useLocation().pathname.slice(3);

  // Database call for user by handle
  const fetchUser = async (handle: string) => {
    setIsLoading(true);
    updatePageState(0);
    // Returns {user_id: ''} if user not found
    const fetchUser = await fetch(
      `${API_URL}/users?handle=${handle}&myHandle=${myHandle}`,
      { method: "GET" }
    );
    const resp: any = await fetchUser.json();
    if (resp.code === "getSuccess") {
      const user: User = JSON.parse(resp.user);
      setUser(user);
      setCurrHandle(user.handle);
      if (user.isFollowing) setIsFollowing(user.isFollowing);
    } else {
      setUser({ handle: "" });
      setCurrHandle("");
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
      setListState(<UserBitList replies={false} />);
    } else if (stateId === 1) {
      // Posts and replies
      setListState(<UserBitList replies={true} />);
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
