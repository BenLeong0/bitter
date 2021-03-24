import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const FindUserForm: React.FC<{}> = () => {
  const [handle, updateHandle] = useState<string>("");

  const [buttonStatus, updateButton] = useState<
    [isButtonEnabled: boolean, buttonOpacity: string]
  >([false, "50%"]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    updateHandle(value);

    // Can't press button if input field is empty
    if (value.length === 0) {
      updateButton([false, "50%"]);
    } else {
      updateButton([true, "100%"]);
    }
  };

  const history = useHistory();
  const handleSubmitClick = async (e: any) => {
    e.preventDefault();

    // Go to user page
    history.push(`/u/${handle}`);

    // Reset input field
    updateHandle("");
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
