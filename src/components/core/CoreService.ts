import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";
import Pool from "../../UserPool";
import HttpService from "./HttpService";

export default class CoreService {

    httpService: HttpService;


    constructor() {
        this.httpService = new HttpService();
    }


    getSession = async (): Promise<any> => {
        let resp: any = new Promise((resolve, reject) => {
            const user: CognitoUser | null = Pool.getCurrentUser();
            if (!user) {reject("not logged in"); return};
            user.getSession(async (err: Error, session: CognitoUserSession | null) => {
                if (err) {
                    reject();
                } else if (session) {
                    const attributes: any = await new Promise((resolve, reject) => {
                        user.getUserAttributes((
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
                        });
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
            });
        });
        return resp;
    };


    authenticate = async (Password: string) => {
        const Username = await this.getSession().then(({user}) => user.username);
        const user = new CognitoUser({Username, Pool })
        const authDetails = new AuthenticationDetails({ Username, Password });

        return await new Promise((resolve, reject) => {
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
    }


    toBase64 = (file: any) => (
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        })
    );


    isEmailUsed = async (email: string): Promise<boolean> => {
      let res = "/users/exists";
      let queryParams = { email };
      let resp: any = await this.httpService.makeGetRequest(res, queryParams);

      console.log(resp);
      return resp;
    };
}
