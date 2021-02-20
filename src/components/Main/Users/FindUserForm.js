import { React, useState } from "react";
import { useHistory } from "react-router-dom";

const FindUserForm = () => {
  const [handle, updateHandle] = useState("");
  const [buttonStatus, updateButton] = useState([false, "50%"]);
  const history = useHistory();

  const handleChange = (e) => {
    const { value } = e.target;
    updateHandle(value);
    if (value.length === 0) {
      updateButton([false, "50%"]);
    } else {
      updateButton([true, "100%"]);
    }
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    console.log(`Submit: ${handle}`);

    const userExists = () => {
      return true;
    };

    if (userExists) {
      let userInfo = retrieveUserInfo(handle);
      history.push(`/u/${userInfo.handle}`);
    }
  };

  const retrieveUserInfo = (userHandle) => {
    return { handle: userHandle };
  };

  return (
    <form>
      <span className="textbox">
        @
        <input
          type="text"
          name="url"
          id="find-user-input-field"
          value={handle}
          placeholder="handle"
          onChange={handleChange}
        />
      </span>
      <button
        type="submit"
        className="button-primary"
        onClick={handleSubmitClick}
        disabled={!buttonStatus[0]}
        style={{ opacity: buttonStatus[1] }}
      >
        Search
      </button>
    </form>
  );
};

export default FindUserForm;
