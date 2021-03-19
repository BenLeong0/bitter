import { React, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserHeader from "../components/UserPage/UserHeader";
import UserBitList from "../components/UserPage/UserBitList";
import UserNotFound from "../components/UserPage/UserNotFound";
import "../components/UserPage/UserPage.css";

const UserPage = (props) => {
  const [user, setUser] = useState({});
  const [pageState, setPageState] = useState(
    <UserBitList {...user} {...props} />
  );

  const { API_URL, currId } = props;

  const handle = useLocation().pathname.slice(3);

  // Get profile info about user by handle (display name, bio, etc), save in -user- and save to global -curr_id-
  const fetchUser = async (handle) => {
    const fetchUser = await fetch(`${API_URL}user/get?handle=${handle}`);
    const data = await fetchUser.json();
    setUser(data);
    console.log(data);
    props.setCurrId(data.user_id);
    console.log("wo" + currId);
  };

  // Load info (first access)
  useEffect(() => {
    fetchUser(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update when moving between user pages
  const history = useHistory();
  useEffect(() => {
    return history.listen((location) => {
      fetchUser(location.pathname.slice(3));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  function updatePageState(stateId) {
    if (stateId === 0) {
      // Posts
      setPageState(<UserBitList {...user} {...props} replies={false} />);
    } else if (stateId === 1) {
      // Posts and replies
      setPageState(<UserBitList {...user} {...props} replies={true} />);
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
    <div className="user-page">
      {currId !== -1 ? (
        <>
          <UserHeader {...user} {...props} updatePageState={updatePageState} />
          {pageState}
        </>
      ) : (
        <UserNotFound handle={handle} />
      )}
    </div>
  );
};

export default UserPage;
