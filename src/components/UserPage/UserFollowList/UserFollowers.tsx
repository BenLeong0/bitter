import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../Account";
import UserFollowList from "../UserFollowList";
import User from "../../../Types/User";
import ContextProps from "../../../Types/ContextProps";
import UserService from "../../core/UserService";

export interface UserFollowingProps {}

const UserFollowers: React.FC<UserFollowingProps> = () => {
  const userService = new UserService();

  // fetch list of bits
  const [users, setUsers] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currHandle, myHandle }: ContextProps = useContext(AccountContext);

  // Fetch posts every time the user changes
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currHandle]);

  const fetchUsers = async () => {
    setIsLoading(true);

    await userService
      .getFollowers(currHandle, myHandle)
      .then((users) => setUsers(users))
      .catch((users) => setUsers(users));

    setIsLoading(false);
  };

  return <UserFollowList users={users} isLoading={isLoading} />;
};

export default UserFollowers;
