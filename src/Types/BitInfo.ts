export default interface BitInfo {
    post_id: string;
    content: string;
    display_name?: string;
    handle?: string;
    index?: number;
    post_time: string;
    reply_to?: number;
    status?: number;
    user_id?: string;
    main_bit?: boolean
    replies: number;
    reposts: number;
    likes: number;
    dislikes: number;
    isLiked?: boolean;
    isDisliked?: boolean;
    isReposted?: boolean
  }