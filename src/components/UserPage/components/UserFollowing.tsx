import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../Account";
import User from "../../../Types/User";
import UserFollowList from "./UserFollowList";

export interface UserFollowingProps {}

const UserFollowing: React.FC<UserFollowingProps> = () => {
  // fetch list of bits
  const [users, setUsers] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    API_URL,
    currHandle,
    myHandle,
  }: { API_URL: string; currHandle: string; myHandle: string } = useContext(
    AccountContext
  );

  // Fetch posts every time the user changes
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currHandle]);

  const fetchUsers = async () => {
    setIsLoading(true);
    const data = await fetch(
      `${API_URL}/users/following?handle=${currHandle}&myHandle=${myHandle}`
    );
    const items: Array<User> = await data.json();
    setUsers(items);
    setIsLoading(false);
  };

  return <UserFollowList users={users} isLoading={isLoading} />;
};

export default UserFollowing;
