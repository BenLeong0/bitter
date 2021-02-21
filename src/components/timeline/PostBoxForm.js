import { React, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const PostBoxForm = (props) => {
  const [post, updatePost] = useState("");
  const [remainingChars, updateChars] = useState(140);
  const [charCounterColour, changeCounterColour] = useState("black");
  const [buttonStatus, updateButton] = useState([false, "50%"]);

  const enableButton = () => {
    updateButton([true, "100%"]);
  };
  const disableButton = () => {
    updateButton([false, "50%"]);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    updatePost(value);
    updateChars(140 - value.length);
    if (value.length > 140) {
      disableButton();
      changeCounterColour("red");
    } else if (value.length > 110) {
      enableButton();
      changeCounterColour("orange");
    } else {
      enableButton();
      changeCounterColour("black");
    }
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (remainingChars < 0 || remainingChars >= 140) {
      console.error("Invalid post length.");
      return;
    }
    const formData = new FormData();
    formData.append("user_id", props.myId);
    formData.append("content", post);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch(`${props.API_URL}bit/post`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    updatePost("");
  };

  return (
    <div className="postbox-input">
      <form>
        <TextareaAutosize
          type="text"
          className="bit-content"
          id="postbox-input-field"
          placeholder="Post a bit!"
          value={post}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="button-primary"
          onClick={handleSubmitClick}
          disabled={!buttonStatus[0]}
          style={{ opacity: buttonStatus[1] }}
        >
          Post
        </button>
        <div id="postbox-charcount" style={{ color: charCounterColour }}>
          Remaining characters: {remainingChars}
        </div>
      </form>
    </div>
  );
};

export default PostBoxForm;
