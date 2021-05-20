import {
    CognitoAccessToken,
    CognitoIdToken,
    CognitoRefreshToken,
    CognitoUser
} from "amazon-cognito-identity-js";
import SessionUser from "./SessionUser"


export default interface Session {
    accessToken: CognitoAccessToken & any;
    clockDrift: number;
    "custom:role"?: string;
    email: string;
    email_verified: string;
    headers: any;
    idToken: CognitoIdToken;
    refreshToken: CognitoRefreshToken;
    sub: string;
    user: CognitoUser & SessionUser;
  };
