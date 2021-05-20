import React, { createContext, useState, useEffect } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import CoreService from "./core/CoreService";

interface Props {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  myHandle: string;
  setMyHandle: React.Dispatch<React.SetStateAction<string>>;
  children: any;
}

const AccountContext = createContext<any>(undefined);

const Account: React.FC<Props> = ({
  isLoggedIn,
  setIsLoggedIn,
  myHandle,
  setMyHandle,
  children,
}) => {
  const coreService = new CoreService();

  // Info about current user being viewed, i.e. owner of /u/handle
  const [currHandle, setCurrHandle] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // Hook to refresh timeline after posting
  const [refreshList, setRefreshList] = useState<boolean>(true);

  useEffect(() => {
    coreService
      .getSession()
      .then((session: any) => {
        if (session["custom:role"] === "admin") setIsAdmin(true);
        setIsLoggedIn(true);
        setMyHandle(session.user.username);
      })
      .catch((err) => {
        setMyHandle("");
        setIsAdmin(false);

        return;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authenticate = async (Username: string, Password: string) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess:", data);
          resolve(data);
        },

        onFailure: (err) => {
          console.error("onFailure:", err);
          reject(err);
        },

        newPasswordRequired: (data) => {
          console.log("newPasswordRequired:", data);
          resolve(data);
        },
      });
    });

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      setMyHandle("");
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

  const refreshBitList = () => {
    setRefreshList(!refreshList);
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        logout,
        refreshList,
        setRefreshList,
        refreshBitList,
        isLoggedIn,
        setIsLoggedIn,
        isFollowing,
        setIsFollowing,
        currHandle,
        setCurrHandle,
        isAdmin,
        setIsAdmin,
        myHandle,
        setMyHandle,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
