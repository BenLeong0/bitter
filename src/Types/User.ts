export default interface User {
    handle: string;
    display_name?: string;
    created_on?: string;
    bio?: string;
    follower_count?: number;
    following_count?: number;
    isFollowing?: boolean;
    bits_count?: number;
    replies?: number;
    likes?: number;
    dislikes?: number
}