import React, { createContext, useState, useEffect } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import Pool from "../UserPool";

// type ContextProps = {
//   authenticate: (Username: string, Password: string) => Promise<undefined>;
//   getSession: () => Promise<any>;
//   logout: () => void;
//   isLoggedIn: boolean;
//   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
//   currHandle: string;
//   setCurrHandle: React.Dispatch<React.SetStateAction<string>>;
//   API_URL: string;
//   isFollowing: boolean;
//   setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
//   myId: string;
//   createFollowEdge: (sourceId: string, destinationId: string) => Promise<void>;
//   deleteFollowEdge: (sourceId: string, destinationId: string) => Promise<void>;
//   isEmailUsed: (email: string) => Promise<boolean>
// };

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
  const API_URL: string = "http://localhost:8000/";

  const [myId, setMyId] = useState<string>("");

  // Info about current user being viewed, i.e. owner of /u/handle
  const [currHandle, setCurrHandle] = useState<string>("");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    getSession()
      .then((session: any) => {
        setIsLoggedIn(true);
        setMyId(session.sub);
        setMyHandle(session.user.username);
      })
      .catch((err) => {
        setMyId("");

        return;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSession = async (): Promise<any> =>
    await new Promise((resolve, reject) => {
      const user: CognitoUser | null = Pool.getCurrentUser();
      if (user) {
        user.getSession(
          async (err: Error, session: CognitoUserSession | null) => {
            if (err) {
              reject();
            } else if (session) {
              const attributes: any = await new Promise((resolve, reject) => {
                user.getUserAttributes(
                  (
                    err: Error | undefined,
                    attributes: CognitoUserAttribute[] | undefined
                  ) => {
                    if (err) {
                      reject(err);
                    } else if (attributes) {
                      const results: any = {};

                      for (let attribute of attributes) {
                        const { Name, Value } = attribute;
                        results[Name] = Value;
                      }

                      resolve(results);
                    }
                  }
                );
              });

              const token = session.getIdToken().getJwtToken();

              resolve({
                user,
                headers: {
                  Authorization: token,
                  "x-api-key": attributes["custom:apikey"],
                },
                ...session,
                ...attributes,
              });
            }
          }
        );
      } else {
        reject("Not logged in");
      }
    });

  const createFollowEdge = async (destinationHandle: string) => {
    getSession().then(async ({ headers }) => {
      fetch(
        `https://7z39hjjfg1.execute-api.eu-west-2.amazonaws.com/dev/users/follow?handle=${destinationHandle}`,
        { headers, method: "POST" }
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error("Follow error:", error));
    });
  };

  const deleteFollowEdge = async (destinationHandle: string) => {
    getSession().then(async ({ headers }) => {
      fetch(
        `https://7z39hjjfg1.execute-api.eu-west-2.amazonaws.com/dev/users/unfollow?handle=${destinationHandle}`,
        { headers, method: "POST" }
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error("Unfollow error:", error));
    });
  };

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
      setMyId("");
      setMyHandle("");
      setIsLoggedIn(false);
    }
  };

  const isEmailUsed = async (email: string): Promise<boolean> => {
    const data = await fetch(
      `https://7z39hjjfg1.execute-api.eu-west-2.amazonaws.com/dev/users/exists?email=${email}`
    );
    const result = await data.json();
    console.log(result);

    return result;
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        isLoggedIn,
        setIsLoggedIn,
        currHandle,
        setCurrHandle,
        API_URL,
        isFollowing,
        setIsFollowing,
        myId,
        setMyId,
        myHandle,
        createFollowEdge,
        deleteFollowEdge,
        isEmailUsed,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
