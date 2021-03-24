import {
  CognitoUserPool,
  // CognitoUserAttribute,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-west-2_Cv2kBw6cS",
  ClientId: "41dj7de1t0qrns7mj8h1n57qfs",
};

export default new CognitoUserPool(poolData);
