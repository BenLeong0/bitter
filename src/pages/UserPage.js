import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserHeader from "../components/UserPage/UserHeader";
import UserBitList from "../components/UserPage/UserBitList";
import UserNotFound from "../components/UserPage/UserNotFound";
import "../components/UserPage/UserPage.css";

const UserPage = (props) => {
  const [user, setUser] = useState({});

  // Get profile info about user (display name, bio, etc)
  const fetchUser = async (handle) => {
    const fetchUser = await fetch(`${props.API_URL}user/get?handle=${handle}`);
    const data = await fetchUser.json();
    setUser(data);
    props.setCurrId(data.user_id);
  };

  // Load info (first access)
  useEffect(() => {
    fetchUser(props.match.params.handle);
  }, []);

  // Update when moving between user pages
  const history = useHistory();
  useEffect(() => {
    return history.listen((location) => {
      fetchUser(location.pathname.slice(3));
    });
  }, [history]);

  return (
    <div className="user-page">
      {props.currId !== -1 ? (
        <>
          <UserHeader {...user} {...props} />{" "}
          <UserBitList {...user} {...props} />{" "}
        </>
      ) : (
        <UserNotFound {...props} />
      )}
    </div>
  );
};

export default UserPage;
