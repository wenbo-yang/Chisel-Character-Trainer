import { ServicePorts, serviceMapping } from './globalSerivceConfigMapping';

export class GlobalServiceConfigs {
    public getServicePorts(serviceName: string, env: string): ServicePorts {
        return serviceMapping.get(serviceName)?.get(env) || ({ http: 5000, https: 3000 } as ServicePorts);
    }
}
