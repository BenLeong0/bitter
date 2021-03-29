import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserHeader from "../components/UserPage/UserHeader";
import UserBitList from "../components/UserPage/UserBitList";
import UserNotFound from "../components/UserPage/UserNotFound";
import "../components/UserPage/UserPage.css";
import { AccountContext } from "../components/Account";

import User from "../Types/User";
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
    currHandle,
    setCurrHandle,
    myHandle,
    setIsFollowing,
  }: {
    currHandle: string;
    setCurrHandle: React.Dispatch<React.SetStateAction<string>>;
    myHandle: string;
    setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  } = useContext(AccountContext);

  const handle: string = useLocation().pathname.slice(3);

  // Database call for user by handle
  const fetchUser = async (handle: string) => {
    setIsLoading(true);
    // Returns {user_id: ''} if user not found
    const fetchUser = await fetch(
      `https://7z39hjjfg1.execute-api.eu-west-2.amazonaws.com/dev/users/data?handle=${handle}&myHandle=${myHandle}`
    );
    const data: User = await fetchUser.json();
    setUser(data);
    setCurrHandle(data.handle);
    if (data.isFollowing) {
      setIsFollowing(data.isFollowing);
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
      //
    } else if (stateId === 3) {
      // followers list
      //
    } else if (stateId === 4) {
      // like list
      //
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
