# policy-client-js
A client in js for PolicyServer1

## Installation
```node
npm install --save policy-client
```

## Posc 
Posc is a javascript library that manage client interaction with a Policy Server.
The user need to have a user token from something like a OpenID server.

## PolicyManager
The PolicyManager is there to receive all permission from the server.

__Required settings__
* authority (string): The URL of the PolicyServer provider.
* clientId (string): Your client application's idenfier. Need to be the same as the token.
* requireHttpsMetadata (boolean, default: true): Does the provider need to have an https connection.

The PolicyServer need to accept request with CORS settings.

```
var config = {
    authority: "http://localhost:5002",
    clientId: 'spa',
    requireHttpsMetadata: false
}

var mgr = new Posc.PolicyManager(config);
```

__Methods__
* setToken: set the current token
* removeToken: remove the current token
* getPolicy: get the current policy
* removePolicy: remove the current policy
* getPermssionEndpoint: find the permission endpoint

## Permission
The permission object return from the endpoint should look like this :`

```
export interface Permission {
    issuer: string;
    clientId: string;
    expireIn: number;
    created?: number;
    policyHash: string;
    lastPolicyChangeDate: Date;
    roles: string[];
    permissions: string[];
}
```

## Get Policy
When you want to get a policy for the current logged user you can use this logic :

```
mgr.setToken('TOKEN');
mgr.getPolicy().then(p => {
    console.log('this is the policy', p);
}); 
```