import { Permission } from "./models";
import { HttpClient } from "./http-client";

export class PolicyStore {

    private readonly _http: HttpClient;

    constructor(httpClient?: HttpClient) {
        this._http = httpClient != null ? httpClient : new HttpClient();
    }

    public getPolicy(url: string, cliendId: string, token: string): Promise<Permission> {
        return this._http.get<Permission>(`${url}?clientId=${cliendId}`, {
            Authorization: 'Bearer ' + token
        });
    }

}
