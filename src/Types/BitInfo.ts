export default interface BitInfo {
    post_id: string;
    content: string;
    display_name?: string;
    handle?: string;
    index?: number;
    post_time: string;
    reply_to?: string;
    reply_author?: string;
    status?: number;
    user_id?: string;
    replies: number;
    reposts: number;
    likes: number;
    dislikes: number;
    isLiked?: boolean;
    isDisliked?: boolean;
    isReposted?: boolean;
    rebitter?: string;
    pre_thread?: Array<BitInfo>;
    reply_threads?: Array<Array<BitInfo>>
  }

  export const emptyPost: BitInfo = {
    post_id: "",
    handle: "",
    post_time: "",
    content: "",
    dislikes: 0,
    likes: 0,
    replies: 0,
    reposts: 0,
  };
