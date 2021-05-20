import {
    CognitoUserSession,
    CognitoUserPool,
    ClientMetadata,
    CookieStorage
} from "amazon-cognito-identity-js"

export default interface SessionUser {
    Session: any;
    authenticationFlowType: string;
    client: ClientMetadata;
    keyPrefix: string;
    pool: CognitoUserPool;
    signInUserSession: CognitoUserSession;
    storage: CookieStorage;
    userDataKey: string;
    username: string;
  }
