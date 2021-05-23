import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";
import Pool from "../../UserPool";
import Session from "../../Types/Session";

export default class CoreService {

    months: string[] = [
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

        let temp: number = Math.floor(milliseconds / 1000);

        let days: number = Math.floor((temp %= 31536000) / 86400);
        if (days) {
            // Full date if over a month ago, show year if not current year
            if (days <= 30) return days + "d";
            let day: string = String(bitTime.getDate());
            let month: string = this.months[bitTime.getMonth()];
            let year: string = (
                bitTime.getFullYear() === new Date().getFullYear()
                ? ""
                : ", bitTime.getFullYear()"
            );
            return month + day + year;
        }

        let hours: number = Math.floor((temp %= 86400) / 3600);
        if (hours) return hours + "h";

        let minutes: number = Math.floor((temp %= 3600) / 60);
        if (minutes) return minutes + "m";

        let seconds: number = temp % 60;
        if (seconds) return seconds + "s";

        return "less than a second"; //'just now' //or other string you like;
        }


    formatBitDate(date: Date) {
        let hours: any = date.getHours();
        let minutes: any = date.getMinutes();
        let ampm: any = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        let strTime = hours + ":" + minutes + " " + ampm;
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


    formatJoinDate = (date: string | undefined) => {
      if (!date) return "";
      let x = new Date(date);
      let month = x.getMonth();
      let year = x.getFullYear();
      return "Joined: " + this.months[month] + " " + year;
    };
}
