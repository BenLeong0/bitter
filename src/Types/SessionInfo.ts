import {CognitoUserSession,CognitoUserAttribute,CognitoUser } from "amazon-cognito-identity-js"

export default interface SessionInfo {
user:CognitoUser,
    headers: {
      Authorization: string,
      "x-api-key": CognitoUserAttribute,
    },
    session: CognitoUserSession,
    attributes: Array<CognitoUserAttribute>,
  }