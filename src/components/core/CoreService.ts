import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";
import Pool from "../../UserPool";

export default class Core {
    getSession = async (): Promise<any> =>
        await new Promise((resolve, reject) => {
        const user: CognitoUser | null = Pool.getCurrentUser();
        if (user == null) return reject("Not logged in");

        user.getSession(async (err: Error, session: CognitoUserSession | null) => {
            if (err || !session) return reject();

            const attributes: any = await new Promise((resolve, reject) => {
                user.getUserAttributes(
                (
                    err: Error | undefined,
                    attributes: CognitoUserAttribute[] | undefined
                ) => {
                    if (err || !attributes) return reject(err);

                    const results: any = {};
                    for (let attribute of attributes) {
                        const { Name, Value } = attribute;
                        results[Name] = Value;
                    }

                    resolve(results);
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
        });
    });


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


    toBase64 = (file: any) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
}
