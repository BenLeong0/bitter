import CoreService from "./CoreService";
import HttpService from "./HttpService";

export default class UserService {

    httpService: HttpService;
    coreService: CoreService;


    constructor() {
        this.httpService = new HttpService();
        this.coreService = new CoreService();
    }


    // Get user

    // Get following/followers

    deleteAccount = async (): Promise<void> => {
        let session = await this.coreService.getSession();
        let { accessToken } = session;

        let res = "/users";
        let body = { accessToken: accessToken.jwtToken };
        let resp = await this.httpService.makeDeleteRequest(res, body);
        return new Promise((resolve, reject) => {
          if (resp.code === "deleteSuccess") {
            console.log(resp);
            resolve();
          } else {
            console.error(resp);
            reject();
          }
        });
    }
}
