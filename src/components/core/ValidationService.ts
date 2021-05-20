import HttpService from "./HttpService";

export default class ValidationService {

    httpService: HttpService;


    constructor() {
        this.httpService = new HttpService();
    }


    isPasswordValid = (s: string) => {
        if (s.length < 8) return false;
        return (
          /[a-z]/.test(s) &&
          /[A-Z]/.test(s) &&
          /[0-9]/.test(s) &&
          /[-=+^$*.[\]{}()?"!@#%&/\\,><':;|_~`]/.test(s)
        );
      };


    isEmailUsed = async (email: string): Promise<boolean> => {
        let res = "/users/exists";
        let queryParams = { email };
        let resp: any = await this.httpService.makeGetRequest(res, queryParams);

        console.log(resp);
        return resp;
      };
}
