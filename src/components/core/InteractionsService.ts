import HttpService from "./HttpService";

export default class InteractionsService {

    httpService: HttpService;


    constructor() {
        this.httpService = new HttpService();
    }


    rebitPost = async (post_id: string) => {
      let res = "/bits/rebit";
      let body = { post_id };
      let resp: any = await this.httpService.makePostRequest(res, body);

      if (resp.code === "rebitSuccess") {
        console.log(resp);
      } else {
        console.error(resp);
      }
    };


    unrebitPost = async (post_id: string) => {
      let res = "/bits/rebit";
      let body = { post_id };
      let resp: any = await this.httpService.makeDeleteRequest(res, body);

      if (resp.code === "unrebitSuccess") {
        console.log(resp);
      } else {
        console.error(resp);
      }
    };


    likePost = async (post_id: string) => {
      let res = "/bits/like";
      let body = { post_id };
      let resp: any = await this.httpService.makePostRequest(res, body);

      if (resp.code === "likeSuccess") {
        console.log(resp);
      } else {
        console.error(resp);
      }
    };


    unlikePost = async (post_id: string) => {
      let res = "/bits/like";
      let body = { post_id };
      let resp: any = await this.httpService.makeDeleteRequest(res, body);

      if (resp.code === "unlikeSuccess") {
        console.log(resp);
      } else {
        console.error(resp);
      }
    };


    dislikePost = async (post_id: string) => {
      let res = "/bits/dislike";
      let body = { post_id };
      let resp: any = await this.httpService.makePostRequest(res, body);

      if (resp.code === "dislikeSuccess") {
        console.log(resp);
      } else {
        console.error(resp);
      }
    };


    undislikePost = async (post_id: string) => {
      let res = "/bits/dislike";
      let body = { post_id };
      let resp: any = await this.httpService.makeDeleteRequest(res, body);

      if (resp.code === "undislikeSuccess") {
        console.log(resp);
      } else {
        console.error(resp);
      }
    };
}
