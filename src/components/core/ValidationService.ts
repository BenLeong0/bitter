import HttpService from "./HttpService";

export default class ValidationService {

    httpService: HttpService;


    constructor() {
        this.httpService = new HttpService();
    }


    isEmailUsed = async (email: string): Promise<boolean> => {
        let res = "/users/exists";
        let queryParams = { email };
        let resp: any = await this.httpService.makeGetRequest(res, queryParams);

        console.log(resp);
        return resp;
      };
}
