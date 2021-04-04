export default interface BitInfo {
    post_id: string;
    content: string;
    dislikes?: number;
    display_name?: string;
    handle?: string;
    index?: number;
    likes?: number;
    post_time: string;
    replies?: number;
    reply_to?: number;
    reposts?: number;
    status?: number;
    user_id?: string;
    main_bit?: boolean
  }