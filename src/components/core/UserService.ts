import CoreService from "./CoreService";
import HttpService from "./HttpService";

import User from "../../Types/User";

export default class UserService {

    httpService: HttpService;
    coreService: CoreService;


    constructor() {
        this.httpService = new HttpService();
        this.coreService = new CoreService();
    }


    fetchUser = async (handle: string, myHandle: string=''): Promise<User> => {
      let res = "/users";
      let queryParams = { handle, myHandle };
      let resp: any = await this.httpService.makeGetRequest(res, queryParams);
      return new Promise ((resolve, reject) => {
          if (resp.code === "getSuccess") {
            const user: User = JSON.parse(resp.user);
            resolve(user);
          } else {
              reject({ handle: "" });
          }
      });
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


    getSuggestedUsers = async (myHandle: string): Promise<User[]> => {
        let res = "/users/suggested";
        let queryParams = { myHandle };
        let resp: any = await this.httpService.makeGetRequest(res, queryParams);
        return new Promise ((resolve, reject) => {
            if (resp.code === "getSuccess") {
              const users: Array<User> = JSON.parse(resp.users);
              resolve(users);
            } else {
                reject([]);
            }
        });
    }


    getFollowList = async (list: string, handle: string, myHandle: string=''): Promise<User[]> => {
      let res = `/users/${list}`;
      let queryParams = { handle, myHandle };
      let resp: any = await this.httpService.makeGetRequest(res, queryParams);
      return new Promise((resolve, reject) => {
        if (resp.code === "getSuccess") {
          let userlist: Array<User> = JSON.parse(resp.users);
          resolve(userlist)
        } else {
          console.error(resp);
          reject([])
        }
      })
    }


    getFollowing = async (handle: string, myHandle: string=''): Promise<User[]> =>
      this.getFollowList("following", handle, myHandle);


    getFollowers = async (handle: string, myHandle: string=''): Promise<User[]> =>
      this.getFollowList("followers", handle, myHandle);


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
