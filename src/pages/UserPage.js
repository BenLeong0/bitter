import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserHeader from "../components/UserPage/UserHeader";
import UserBitList from "../components/UserPage/UserBitList";
import "../components/UserPage/UserPage.css";

const UserPage = (props) => {
  const [user, setUser] = useState({});

  const fetchUser = async (handle) => {
    const fetchUser = await fetch(
      `${props.backend_url}user/get?handle=${handle}`
    );
    const data = await fetchUser.json();
    setUser(data);
    // console.log(data.user_id);
    props.setCurrId(data.user_id);
  };

  // First load or direct access
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
      <UserHeader {...user} {...props} />
      <UserBitList {...user} {...props} />
    </div>
  );
};

export default UserPage;
