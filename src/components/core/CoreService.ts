import { CognitoUser, CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";
import Pool from "../../UserPool";

export default class Common {
    getSession = async (): Promise<any> =>
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

    toBase64 = (file: any) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
}
