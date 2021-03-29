import React, { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { AccountContext } from "../Account";

const PostBoxForm: React.FC<{}> = () => {
  const {
    API_URL,
    getSession,
  }: {
    API_URL: string;
    getSession: () => Promise<any>;
  } = useContext(AccountContext);

  const [post, updatePost] = useState<string>("");
  const [remainingChars, updateChars] = useState<number>(140);
  const [charCounterColour, changeCounterColour] = useState<string>("black");
  const [buttonStatus, updateButton] = useState<[boolean, string]>([
    false,
    "50%",
  ]);

  const enableButton = () => {
    updateButton([true, "100%"]);
  };
  const disableButton = () => {
    updateButton([false, "50%"]);
  };

  const handleChange = (e: any) => {
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

  const handleSubmitClick = async (e: any) => {
    e.preventDefault();
    getSession().then(async ({ headers }) => {
      // Set loading

      // Check valid length
      if (remainingChars < 0 || remainingChars >= 140) {
        console.error("Invalid post length.");
        return;
      }

      // Get post content
      const formData = new FormData();
      formData.append("content", post);
      console.log(formData);

      // Set Content-Type (might be correct by default)
      headers["Content-Type"] = "application/json";

      // Request options
      var requestOptions = {
        headers,
        method: "POST",
        body: JSON.stringify({ content: post }),
      };
      console.log(requestOptions);

      fetch(`${API_URL}/bits/post`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const resultJSON = JSON.parse(result);
          // Attach success code with response, empty post if true
          if (resultJSON.code === "postSuccess") {
            updatePost("");
          }
        })
        .catch((error) => console.log("error", error));

      // Set not loading
    });
  };

  return (
    <div className="postbox-input">
      <form>
        <TextareaAutosize
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
