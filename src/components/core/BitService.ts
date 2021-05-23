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

    // Get bitlist

    // Get user bit list
}
