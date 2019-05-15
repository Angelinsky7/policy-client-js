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

export interface Dicovery {
  issuer: string;
  permissionEndpoint: string;
  policyEndpoint: string;
}
