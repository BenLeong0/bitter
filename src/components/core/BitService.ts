import BitInfo, { emptyPost } from "../../Types/BitInfo";
import HttpService from "./HttpService";

export default class BitService {

    httpService: HttpService;


    constructor() {
        this.httpService = new HttpService();
    }


    postBit = async (content: string, replyTo: string=''): Promise<void> => {
      let res = "/bits";
      let body = { content, replyTo };
      let resp: any = await this.httpService.makePostRequest(res, body);
      return new Promise((resolve, reject) => {
        if (resp.code === "postSuccess") {
          console.log(resp);
          resolve();
        } else {
          console.error(resp);
          reject();
        }
      });
    }


    deleteBit = async (post_id: string): Promise<void> => {
      let res = "/bits";
      let body = { post_id };
      let resp: any = await this.httpService.makeDeleteRequest(res, body);
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


    getTimeline = async (timelineType: string, handle: string=''): Promise<BitInfo[]> => {
      console.log("Fetching bits...");

      let res = `/bits/${timelineType}`;
      let queryParams = { handle };
      let resp: any = await this.httpService.makeGetRequest(res, queryParams);
      return new Promise((resolve, reject) => {
        if (resp.code === "getSuccess") {
          let bits: Array<BitInfo> = JSON.parse(resp.posts);
          resolve(bits)
        } else {
          reject([])
        }
      })

    }


    getBitPage = async (handle: string, post_id: string): Promise<BitInfo> => {
      const res = "/bits";
      let queryParams = { handle, post_id };
      let resp: any = await this.httpService.makeGetRequest(res, queryParams);
      return new Promise((resolve, reject) => {
        if (resp.code === "getSuccess") {
          const post: BitInfo = JSON.parse(resp.post);
          resolve(post);
        } else {
          console.error(resp);
          reject(emptyPost);
        }
      })
    }


    getUserBits = async (handle: string, myHandle: string=''): Promise<BitInfo[]> => {
      const res = "/users/posts";
      let queryParams = { handle, myHandle };
      let resp: any = await this.httpService.makeGetRequest(res, queryParams);
      return new Promise((resolve, reject) => {
        if (resp.code === "getSuccess") {
          let bits: Array<BitInfo> = JSON.parse(resp.posts);
          resolve(bits);
        } else {
          console.error(resp);
          reject([]);
        }
      })
    }


    getUserLikes = async (handle: string, myHandle: string=''): Promise<BitInfo[]> => {
      const res = "/users/posts/likes";
      let queryParams = { handle, myHandle };
      let resp: any = await this.httpService.makeGetRequest(res, queryParams);
      return new Promise((resolve, reject) => {
        if (resp.code === "getSuccess") {
          let bits: Array<BitInfo> = JSON.parse(resp.posts);
          resolve(bits);
        } else {
          console.error(resp);
          reject([]);
        }
      })
    }
}
