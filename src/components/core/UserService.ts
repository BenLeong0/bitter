import CoreService from "./CoreService";
import HttpService from "./HttpService";

export default class UserService {

    httpService: HttpService;
    coreService: CoreService;


    constructor() {
        this.httpService = new HttpService();
        this.coreService = new CoreService();
    }


    createFollowEdge = async (destinationHandle: string) => {
      let res = "/users/follow";
      let body = { handle: destinationHandle };
      let resp: any = await this.httpService.makePostRequest(res, body);

      if (resp.code === "followSuccess") {
        console.log(resp);
      } else {
        console.error(resp);
      }
    };


    deleteFollowEdge = async (destinationHandle: string) => {
      let res = "/users/follow";
      let body = { handle: destinationHandle };
      let resp: any = await this.httpService.makeDeleteRequest(res, body);

      if (resp.code === "unfollowSuccess") {
        console.log(resp);
      } else {
        console.error(resp);
      }
    };


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
