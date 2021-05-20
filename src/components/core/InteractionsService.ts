import HttpService from "./HttpService";

export default class InteractionsService {

    httpService: HttpService;


    constructor() {
        this.httpService = new HttpService();
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
}
