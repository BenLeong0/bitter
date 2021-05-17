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
}
