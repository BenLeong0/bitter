export default class HttpService {
    async makeGetRequest(url: string): Promise<any> {
        const requestOptions = {
            method: "GET"
        }
        const data = await fetch(url, requestOptions);
        const resp: any = await data.json();
        return resp
    }
}
