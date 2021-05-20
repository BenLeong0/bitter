import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";
import Pool from "../../UserPool";
import Session from "../../Types/Session";

export default class CoreService {

    getSession = async (): Promise<Session> => {
        let resp: any = new Promise<Session>((resolve, reject) => {
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


    authenticate = async (Password: string): Promise<CognitoUser> => {
        const { user } = await this.getSession()
        const Username = user.username
        const cognitoUser = new CognitoUser({ Username, Pool })
        const authDetails = new AuthenticationDetails({ Username, Password });

        return await new Promise<CognitoUser>((resolve, reject) => {
            cognitoUser.authenticateUser(authDetails, {
                onSuccess: (data) => {
                  console.log("onSuccess:", user);
                  resolve(user);
                },

                onFailure: (err) => {
                  console.error("onFailure:", err);
                  reject(err);
                },

                newPasswordRequired: (data) => {
                  console.log("newPasswordRequired:", data);
                  resolve(user);
                },
            });
        });
    }


    login = async (Username: string, Password: string) =>
        await new Promise<CognitoUserSession>((resolve, reject) => {
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


    toBase64 = (file: any) => (
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        })
    );


    timestampFormat(post_time: string): string {
        const bitTime: Date = new Date(post_time);
        const milliseconds: number = Date.now() - bitTime.getTime(); // Difference in milliseconds
        const months: Array<string> = [
            "Jan ",
            "Feb ",
            "Mar ",
            "Apr ",
            "May ",
            "Jun ",
            "Jul ",
            "Aug ",
            "Sep ",
            "Oct ",
            "Nov ",
            "Dec ",
        ];

        var temp: number = Math.floor(milliseconds / 1000);

        var days: number = Math.floor((temp %= 31536000) / 86400);
        if (days) {
            // Full date if over a month ago, show year if not current year
            if (days > 30) {
            const day: string = String(bitTime.getDate());
            const month: string = months[bitTime.getMonth()];
            const year: string =
                bitTime.getFullYear() === new Date().getFullYear()
                ? ""
                : ", bitTime.getFullYear()";

            return month + day + year;
            }

            return days + "d";
        }
        var hours: number = Math.floor((temp %= 86400) / 3600);
        if (hours) {
            return hours + "h";
        }
        var minutes: number = Math.floor((temp %= 3600) / 60);
        if (minutes) {
            return minutes + "m";
        }
        var seconds: number = temp % 60;
        if (seconds) {
            return seconds + "s";
        }
        return "less than a second"; //'just now' //or other string you like;
        }


    formatDate(date: Date) {
        var hours: any = date.getHours();
        var minutes: any = date.getMinutes();
        var ampm: any = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return (
            date.getMonth() +
            1 +
            "/" +
            date.getDate() +
            "/" +
            date.getFullYear() +
            " " +
            strTime
        );
    }
}
