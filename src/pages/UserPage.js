import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const UserPage = ({ match }) => {
  const [user, setUser] = useState({});

  var handle = match.params.handle;

  const fetchUser = async (handle) => {
    const fetchUser = await fetch(
      `http://localhost:8000/user/get?handle=${handle}`
    );
    const user = await fetchUser.json();

    setUser(user);
  };

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      fetchUser(location.pathname.slice(3));
    });
  }, [history]);

  return <div className="user-page">{user.handle}</div>;
};

export default UserPage;
