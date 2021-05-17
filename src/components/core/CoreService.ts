import { CognitoUser, CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";
import Pool from "../../UserPool";

export default class Common {
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


    toBase64 = (file: any) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
}
