import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../Account";
import ContextProps from "../../../Types/ContextProps";

import BitButtonBar from "./BitButtonBar";
import BitInfo from "../../../Types/BitInfo";
import BitTag from "./BitTag";
import OutsideAlerter from "./OutsideAlerter";
import BitReplyBox from "./BitReplyBox";
import DeletedBit from "./DeletedBit";

import RepliedButton from "./Icons/replied.svg";
import RebitedButton from "./Icons/rebited.svg";
import DeleteButton from "./Icons/delete.svg";

import "./Bit.css";
import CoreService from "../../core/CoreService";
import BitService from "../../core/BitService";

interface OtherProps {
  classes?: string;
}

const Bit: React.FC<BitInfo & OtherProps> = ({ classes = "", ...bitInfo }) => {
  const bitService = new BitService();
  const coreService = new CoreService();

  const { isAdmin, myHandle }: ContextProps = useContext(AccountContext);

  // Profile pic src
  const [src, setSrc] = useState<string>("");

  const onError = () => {
    setSrc("https://bitter-imgs.s3.eu-west-2.amazonaws.com/pfpdefault");
  };

  useEffect(() => {
    setSrc(
      "https://bitter-imgs.s3.eu-west-2.amazonaws.com/pfp-" +
        bitInfo.handle +
        `?${Date.now().toString().slice(0, -4)}`
    );
  }, [bitInfo.handle]);

  // Split for tags
  const splitContent = bitInfo.content.split("@");
  const initialContent = splitContent[0];

  // myHandle to show/hide delete button
  const myPost = myHandle === bitInfo.handle;

  // Hook to hide tweet after deleting
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  // Hook to toggle reply text box
  const [replying, setReplying] = useState<boolean>(false);
  const toggleReplying = (): void => setReplying(!replying);

  if (typeof bitInfo.rebitter !== "undefined" || bitInfo.reply_to !== null) {
    classes += " reply-bit";
  }

  // Delete button
  const handleDeletePost = async (e: any) => {
    e.preventDefault();

    await bitService
      .deleteBit(bitInfo.post_id)
      .then(() => setIsDeleted(true))
      .catch(() => {});
  };

  // Delete popover
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  // Numbers for interactions
  return (
    <>
      {bitInfo.post_id === "DELETED_POST" ? (
        <DeletedBit classes={classes} />
      ) : (
        <div
          className={"bit " + classes.trim()}
          style={{
            display: isDeleted ? "none" : "",
          }}
        >
          <div className="bit-message">
            {/* Show who replied to if reply */}
            <div
              className="bit-reply-author"
              style={{
                display: bitInfo.reply_to === null ? "none" : "",
                top: typeof bitInfo.rebitter === "undefined" ? "4px" : "20px",
              }}
            >
              <img src={RepliedButton} alt="rebit button" />
              <Link to={`/b/${bitInfo.reply_to}`}>
                <span style={{ color: "#10b" }}>Reply</span>
              </Link>{" "}
              to
              <Link to={`/u/${bitInfo.reply_author}`}>
                {" "}
                @{bitInfo.reply_author}
              </Link>
              <span
                style={{
                  display:
                    typeof bitInfo.rebitter === "undefined" ? "none" : "",
                  color: "black",
                }}
              >
                {" "}
                ・{" "}
              </span>
            </div>

            {/* Show who rebitted if rebit */}
            <div
              className="bit-rebitter"
              style={{
                display: typeof bitInfo.rebitter === "undefined" ? "none" : "",
              }}
            >
              <img src={RebitedButton} alt="rebit button" />
              <span>Rebitted by </span>
              <Link to={`/u/${bitInfo.rebitter}`}>@{bitInfo.rebitter}</Link>
            </div>
          </div>

          {/* Poster profile picture */}
          <Link to={`/u/${bitInfo.handle}`}>
            <div className="bit-pfp">
              <img src={src} onError={onError} alt="profile pic" />
            </div>
          </Link>

          <div className="bit-content">
            {/* Poster info */}
            <div className="bit-info">
              <Link to={`/u/${bitInfo.handle}`}>
                <span className="bit-info-displayname">
                  {bitInfo.display_name}
                </span>
                <span className="bit-info-handle">@{bitInfo.handle}</span>
              </Link>
              ・
              <Link to={`/b/${bitInfo.post_id}`}>
                <span
                  className="bit-info-time"
                  title={coreService.formatBitDate(new Date(bitInfo.post_time))}
                >
                  {coreService.timestampFormat(bitInfo.post_time)}
                </span>
              </Link>
            </div>

            <input
              type="image"
              className="bit-delete"
              src={DeleteButton}
              alt="dislike button"
              onClick={() => setIsPopoverOpen(true)}
              style={{ display: myPost || isAdmin ? "block" : "none" }}
            />

            <OutsideAlerter
              isPopoverOpen={isPopoverOpen}
              setIsPopoverOpen={setIsPopoverOpen}
            >
              <div
                className="bit-delete-popover"
                style={{ display: isPopoverOpen ? "block" : "none" }}
                // handleClickOutside={() => setIsPopoverOpen(false)}
              >
                <button
                  className="button-primary delete-post"
                  onClick={handleDeletePost}
                >
                  Delete post
                </button>
                <div className="delete-post-arrow" />
              </div>
            </OutsideAlerter>

            <div className="bit-text">
              {initialContent}
              {splitContent.slice(1).map((tag, index) => (
                <BitTag tag={tag} key={index} />
              ))}
            </div>
            <BitButtonBar
              {...bitInfo}
              toggleReplying={toggleReplying}
              replying={replying}
            />
          </div>
          {replying ? (
            <BitReplyBox post_id={bitInfo.post_id} setReplying={setReplying} />
          ) : (
            ""
          )}
          <hr className="bit-splitter" />
        </div>
      )}
    </>
  );
};

export default Bit;
