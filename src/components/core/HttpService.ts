import CoreService from "./CoreService"


export default class HttpService {
    coreService: CoreService

    constructor() {
        this.coreService = new CoreService()
    }

    async makeGetRequest(url: string): Promise<any> {
        const requestOptions = {
            method: "GET"
        };
        let data: any = await fetch(url, requestOptions);
        let resp: any = await data.json();
        return resp;
    }

    async uploadImage(url: string, file: any, field?: string): Promise<any> {
        const base64File = await this.coreService.toBase64(file);
        if (typeof base64File !== "string") return;

        let {headers} = await this.coreService.getSession();
        headers["Content-Type"] = "application/json";
        console.log(headers);

        let fileType = file.type;

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
