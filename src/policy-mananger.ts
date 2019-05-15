import { PolicyManagerSettings } from "./policy-manager.settings";
import { PolicyStore } from "./policy-store";
import { Permission, Dicovery } from "./models";
import { HttpClient } from "./http-client";
import { StateStore } from "./state-store";

export class PolicyManager {

    private readonly _http: HttpClient = new HttpClient();

    public readonly settings: PolicyManagerSettings;
    private readonly _defaultSettings: PolicyManagerSettings = <PolicyManagerSettings> {
        authority: undefined,
        requireHttpsMetadata: true,
        endpoints: {
            discovery: '.well-known/policy-configuration',
            permission: undefined,
            policy: undefined
        },
        policyStore: new PolicyStore(this._http),
        stateStore: new StateStore()
    };

    private _loaded: boolean = false;
    private _token: string;

    constructor(settings?: PolicyManagerSettings) {
        this.settings = Object.assign(this._defaultSettings, settings);
    }

    public setToken(token: string) {
        this._token = token;
    }
    public removeToken() {
        this._token = null;
    }

    public getPolicy(): Promise<Permission> {
        const key = `permision:${this.settings.authority}:${this.settings.clientId}`;
        return this.getPermssionEndpoint().then(url => {
            return this.settings.stateStore.get(key).then(strPermission => {
                const currentPermission = strPermission != null ? JSON.parse(strPermission) as Permission : null;
                const hasCacheData = currentPermission != null && new Date().getTime() <= (currentPermission.created + (currentPermission.expireIn * 1000));
                if (hasCacheData) {
                    return new Promise<Permission>(r => { r(currentPermission); })
                } else {
                    return this.settings.policyStore.getPolicy(url, this.settings.clientId, this._token).then(newPermssion => {
                        newPermssion.created = new Date().getTime();
                        this.settings.stateStore.set(key, JSON.stringify(newPermssion));
                        return newPermssion;
                    });
                }
            });
        });
    }

    public removePolicy() {
        const key = `permision:${this.settings.authority}:${this.settings.clientId}`;
        this.settings.stateStore.remove(key);
    }

    public getPermssionEndpoint(): Promise<string> {
        if (this.settings.endpoints.permission != null) {
            return new Promise<string>(r => r(this.settings.endpoints.permission));
        }

        return this._http.get<Dicovery>(`${this.settings.authority}/${this.settings.endpoints.discovery}`).then(p => {
            this.settings.endpoints.permission = p.permissionEndpoint;
            this.settings.endpoints.policy = p.policyEndpoint;
            return p.permissionEndpoint;
        });
    }

}
