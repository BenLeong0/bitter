import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../Account";
import UserFollowList from "./UserFollowList";
import User from "../../../Types/User";
import ContextProps from "../../../Types/ContextProps";
import HttpService from "../../core/HttpService";

export interface UserFollowingProps {}

const UserFollowers: React.FC<UserFollowingProps> = () => {
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

    let res = "/users/followers";
    let queryParams = { handle: currHandle, myHandle };
    let resp: any = await httpService.makeGetRequest(res, queryParams);

    if (resp.code === "getSuccess") {
      let userlist: Array<User> = JSON.parse(resp.users);
      setUsers(userlist);
    } else {
      setUsers([]);
      console.error(resp);
    }

    setIsLoading(false);
  };

  return <UserFollowList users={users} isLoading={isLoading} />;
};

export default UserFollowers;
