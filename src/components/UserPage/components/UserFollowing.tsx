import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../Account";
import User from "../../../Types/User";
import UserFollowList from "./UserFollowList";
import ContextProps from "../../../Types/ContextProps";
import HttpService from "../../core/HttpService";

export interface UserFollowingProps {}

const UserFollowing: React.FC<UserFollowingProps> = () => {
  const httpService = new HttpService();

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
    const res = `/users/following?handle=${currHandle}&myHandle=${myHandle}`;
    const resp: any = await httpService.makeGetRequest(res);

    if (resp.code === "getSuccess") {
      const userlist: Array<User> = JSON.parse(resp.users);
      setUsers(userlist);
    } else {
      setUsers([]);
    }
    setIsLoading(false);
  };

  return <UserFollowList users={users} isLoading={isLoading} />;
};

export default UserFollowing;
