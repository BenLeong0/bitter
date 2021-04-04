import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BitNotFound from "../components/BitPage/BitNotFound";
import "../components/UserPage/UserPage.css";
import { AccountContext } from "../components/Account";
import Bit from "../components/Main/BitList/Bit";

import BitInfo from "../Types/BitInfo";

const BitPage: React.FC<{}> = () => {
  const [post, setPost] = useState<BitInfo>({
    post_id: "",
    handle: "",
    post_time: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  document.title = (post.handle ? "@" + post.handle : "post") + " / Bitter";

  const {
    API_URL,
    myHandle,
  }: {
    API_URL: string;
    myHandle: string;
  } = useContext(AccountContext);

  const post_id: string = useLocation().pathname.slice(3);

  // Database call for post by post_id
  const fetchPost = async (post_id: string) => {
    setIsLoading(true);
    // Returns {post_id: '', handle: ''} if post not found
    const fetchInfo = await fetch(
      `${API_URL}/bits?post_id=${post_id}&handle=${myHandle}`
    );
    const data: BitInfo = await fetchInfo.json();
    console.log(data);

    setPost(data);
    // if (data.haveLiked) {
    //   setIsFollowing(data.isFollowing);
    // }
    setIsLoading(false);
  };

  // Load post on mount
  useEffect(() => {
    fetchPost(post_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update when moving between post pages
  const history = useHistory();
  useEffect(() => {
    return history.listen((location) => {
      fetchPost(location.pathname.slice(3));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // }, [history]);

  return (
    <>
      {isLoading ? (
        <div className="user-loader">
          <div className="loader" />
        </div>
      ) : (
        <div className="bit-page">
          {post.post_id !== "" ? <Bit {...post} main_bit /> : <BitNotFound />}
        </div>
      )}
    </>
  );
};

export default BitPage;
