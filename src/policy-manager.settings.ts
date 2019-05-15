import { PolicyStore } from './policy-store';
import { StateStore } from './state-store';

export interface PolicyManagerSettings {
  authority: string;
  clientId: string;

  requireHttpsMetadata: boolean;

  endpoints: PolicyManagerEndpointSettings;

  policyStore: PolicyStore;
  stateStore: StateStore;
}

export interface PolicyManagerEndpointSettings {
  discovery: string;
  permission: string;
  policy: string;
}
