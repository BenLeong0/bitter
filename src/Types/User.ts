export default interface User {
    user_id: string;
    handle?: string;
    display_name?: string;
    created_on?: string;
    bio?: string;
    follower_count?: number;
    following_count?: number;
}