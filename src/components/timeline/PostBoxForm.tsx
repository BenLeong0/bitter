import React, { useContext, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { AccountContext } from "../Account";

const PostBoxForm: React.FC<{}> = () => {
  const {
    API_URL,
    getSession,
    refreshBitList,
  }: {
    API_URL: string;
    getSession: () => Promise<any>;
    refreshBitList: () => void;
  } = useContext(AccountContext);

  const [post, updatePost] = useState<string>("");
  const [remainingChars, updateChars] = useState<number>(140);
  const [charCounterColour, changeCounterColour] = useState<string>("black");
  const [buttonStatus, updateButton] = useState<[boolean, string]>([
    false,
    "50%",
  ]);

  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const enableButton = () => {
    updateButton([true, "100%"]);
  };
  const disableButton = () => {
    updateButton([false, "50%"]);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    updatePost(value);
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
  useEffect(() => {
    updateCharCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const handleSubmitClick = async (e: any) => {
    e.preventDefault();
    getSession().then(async ({ headers }) => {
      // Check valid length
      if (remainingChars < 0 || remainingChars >= 140) {
        console.error("Invalid post length.");
        return;
      }

      // Set loading
      setIsLoading(true);

      // Get post content
      const formData = new FormData();
      formData.append("content", post);

      // Set Content-Type (might be correct by default)
      headers["Content-Type"] = "application/json";

      // Request options
      var requestOptions = {
        headers,
        method: "POST",
        body: JSON.stringify({ content: post }),
      };

      // Post to API
      await fetch(`${API_URL}/bits/post`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const resultJSON = JSON.parse(result);

          // success/failure handling
          if (resultJSON.code === "postSuccess") {
            // Empty input field
            updatePost("");
          } else {
            // Error message
            setErrorOccurred(true);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
          setErrorOccurred(true);
        })
        .finally(() => {
          // Set not loading
          setIsLoading(false);
          refreshBitList();
        });
    });
  };

  return (
    <div className="postbox-input">
      {isLoading ? (
        <div id="postbox-loader-wrapper">
          <div className="loader" />
        </div>
      ) : (
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

export default PostBoxForm;
