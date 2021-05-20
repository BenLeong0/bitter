import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import HttpService from "../../core/HttpService";

export interface BitReplyBoxProps {
  post_id: string;
  setReplying: React.Dispatch<React.SetStateAction<boolean>>;
}

const BitReplyBox: React.FC<BitReplyBoxProps> = ({ post_id, setReplying }) => {
  const httpService = new HttpService();

  const [post, updatePost] = useState<string>("");
  const [remainingChars, updateChars] = useState<number>(140);
  const [charCounterColour, changeCounterColour] = useState<string>("black");
  const [buttonStatus, updateButton] = useState<[boolean, string]>([
    false,
    "50%",
  ]);

  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const enableButton = () => updateButton([true, "100%"]);
  const disableButton = () => updateButton([false, "50%"]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    updatePost(value);
  };

  const handleSubmitClick = async (e: any) => {
    e.preventDefault();

    // Check valid length
    if (remainingChars < 0 || remainingChars >= 140) {
      console.error("Invalid post length.");
      return;
    }

    // Set loading
    setIsLoading(true);
    setErrorOccurred(false);

    let res = "/bits";
    let body = { content: post, replyTo: post_id };
    let resp = await httpService.makePostRequest(res, body);

    if (resp.code === "postSuccess") {
      // Empty input field
      updatePost("");
      setReplying(false);
      console.log(resp);
    } else {
      // Error message
      setErrorOccurred(true);
      console.error(resp);
    }

    setIsLoading(false);
  };

  const updateCharCount = () => {
    updateChars(140 - post.length);
    if (post.length > 140) {
      disableButton();
      changeCounterColour("red");
    } else if (post.length > 110) {
      enableButton();
      changeCounterColour("orange");
    } else if (post.length === 0) {
      disableButton();
      changeCounterColour("black");
    } else {
      enableButton();
      changeCounterColour("black");
    }
  };

  // Update char count when post changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateCharCount(), [post]);

  return (
    <div className="bit-reply-box">
      {isLoading ? (
        <div id="bit-reply-loader-wrapper">
          <div className="loader" />
        </div>
      ) : (
        <form>
          <TextareaAutosize
            id="postbox-input-field"
            placeholder="Post a reply!"
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
            Post reply
          </button>
          <div id="postbox-charcount" style={{ color: charCounterColour }}>
            Remaining characters: {remainingChars}
          </div>

          {/* Generic error message */}
          {errorOccurred ? (
            <div id="postbox-error">An error occurred.</div>
          ) : (
            ""
          )}
        </form>
      )}
    </div>
  );
};

export default BitReplyBox;
