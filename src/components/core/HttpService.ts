import CoreService from "./CoreService";


export default class HttpService {
    coreService: CoreService;

    constructor() {
        this.coreService = new CoreService();
    }

    async makeGetRequest(url: string): Promise<any> {
        let requestOptions = {
            method: "GET"
        };
        let data: any = await fetch(url, requestOptions);
        let resp: any = await data.json();
        return resp;
    }

    async makePostRequest(url: string, body: any): Promise<any> {
        let {headers} = await this.coreService.getSession();
        headers["Content-Type"] = "application/json";

        let requestOptions = {
            headers,
            method: "POST",
            body: JSON.stringify(body),
        };

        let data: any = await fetch(url, requestOptions);
        let resp: string = await data.text();
        return JSON.parse(resp);
    }

    async makePatchRequest(url: string, body: any): Promise<any> {
        let {headers} = await this.coreService.getSession();
        headers["Content-Type"] = "application/json";

        let requestOptions = {
            headers,
            method: "PATCH",
            body: JSON.stringify(body),
        };

        let data: any = await fetch(url, requestOptions);
        let resp: string = await data.text();
        return JSON.parse(resp);
    }

    async uploadImage(url: string, file: any, field?: string): Promise<any> {
        let base64File = await this.coreService.toBase64(file);
        if (typeof base64File !== "string") return;
        let fileType = file.type;

        let {headers} = await this.coreService.getSession();
        headers["Content-Type"] = "application/json";

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
