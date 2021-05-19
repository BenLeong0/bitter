import CoreService from "./CoreService";

export default class HttpService {
    coreService: CoreService;
    url: string = "https://7z39hjjfg1.execute-api.eu-west-2.amazonaws.com";
    stage: string = "/dev";
    API_URL: string = this.url + this.stage;

    constructor() {
        this.coreService = new CoreService();
    }

    async makeGetRequest(
        res: string,
        queryParams?: { [key: string]: string; }
    ): Promise<any> {
        let url = this.API_URL + res;
        let requestOptions = {
            method: "GET"
        };

        if (typeof queryParams !== "undefined") {
            let reducer = (accumulator: string, currValue: string[]) => (
                accumulator + currValue[0] + '=' + currValue[1] + '&'
            );

            let queryString =  Object.entries(queryParams).reduce(reducer, '?').slice(0,-1);
            url += queryString;
        };

        let data: any = await fetch(url, requestOptions);
        let resp: any = await data.json();
        return resp;
    }

    async makePostRequest(res: string, body: any): Promise<any> {
        let {headers} = await this.coreService.getSession();
        headers["Content-Type"] = "application/json";

        let url = this.API_URL + res;
        let requestOptions = {
            headers,
            method: "POST",
            body: JSON.stringify(body),
        };

        let data: any = await fetch(url, requestOptions);
        let resp: string = await data.text();
        return JSON.parse(resp);
    }

    async makeDeleteRequest(res: string, body: any): Promise<any> {
        let {headers} = await this.coreService.getSession();
        headers["Content-Type"] = "application/json";

        let url = this.API_URL + res;
        let requestOptions = {
            headers,
            method: "DELETE",
            body: JSON.stringify(body),
        };

        let data: any = await fetch(url, requestOptions);
        let resp: string = await data.text();
        return JSON.parse(resp);
    }

    async makePatchRequest(res: string, body: any): Promise<any> {
        let {headers} = await this.coreService.getSession();
        headers["Content-Type"] = "application/json";

        let url = this.API_URL + res;
        let requestOptions = {
            headers,
            method: "PATCH",
            body: JSON.stringify(body),
        };

        let data: any = await fetch(url, requestOptions);
        let resp: string = await data.text();
        return JSON.parse(resp);
    }

    async uploadImage(res: string, file: any, field?: string): Promise<any> {
        let base64File = await this.coreService.toBase64(file);
        if (typeof base64File !== "string") return;
        let fileType = file.type;

        let {headers} = await this.coreService.getSession();
        headers["Content-Type"] = "application/json";

        let url = this.API_URL + res;
        let requestOptions = {
            headers,
            method: "PUT",
            body: JSON.stringify({
                image: base64File,
                field,
                type: fileType,
            }),
        };

        let data: any = await fetch(url, requestOptions);
        let resp: string = await data.text();
        return JSON.parse(resp);
    }
}
