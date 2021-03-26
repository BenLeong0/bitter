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
//   checkIfFollowing: (
//     sourceId: number,
//     destinationId: number
//   ) => Promise<boolean>;
//   currId: number;
//   setCurrId: React.Dispatch<React.SetStateAction<number>>;
//   API_URL: string;
//   isFollowing: boolean;
//   setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
//   myId: number;
//   createFollowEdge: (sourceId: number, destinationId: number) => Promise<void>;
//   deleteFollowEdge: (sourceId: number, destinationId: number) => Promise<void>;
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

  // const [myId, setMyId] = useState<string>('');
  // Change get_timeline in django
  const [myId, setMyId] = useState<number>(0);

  // Info about current user being viewed, i.e. owner of /u/handle
  const [currId, setCurrId] = useState<number>(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const checkIfFollowing = async (sourceId: number, destinationId: number) => {
    const data = await fetch(
      `${API_URL}is-following/get?source_id=${sourceId}&destination_id=${destinationId}`
    );
    const result = await data.json();
    return result;
  };

  useEffect(() => {
    getSession()
      .then((session: any) => {
        setIsLoggedIn(true);
        // setmyid(session.sub)
        setMyId(1);
        setMyHandle(session.user.username);
      })
      .catch((err) => {
        return;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSession = async () =>
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

  const createFollowEdge = async (sourceId: number, destinationId: number) => {
    fetch(
      `${API_URL}create-follow/post?source_id=${sourceId}&destination_id=${destinationId}`,
      { method: "POST" }
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error("Follow error:", error));
  };

  const deleteFollowEdge = async (sourceId: number, destinationId: number) => {
    fetch(
      `${API_URL}delete-follow/post?source_id=${sourceId}&destination_id=${destinationId}`,
      { method: "POST" }
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error("Unfollow error:", error));
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
      setIsLoggedIn(false);
      setMyId(0);
    }
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        isLoggedIn,
        setIsLoggedIn,
        checkIfFollowing,
        currId,
        setCurrId,
        API_URL,
        isFollowing,
        setIsFollowing,
        myId,
        setMyId,
        myHandle,
        createFollowEdge,
        deleteFollowEdge,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
