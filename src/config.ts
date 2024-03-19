import * as staticServiceConfig from '../configs/service.config.json';
import * as globalServicePortMappings from '../Chisel-Global-Service-Configs/configs/globalServicePortMappings.json';

export interface ServiceConfig {
    serviceName: string;
    shortName: string;
}

export interface ServicePorts {
    http: number;
    https: number;
}

export class Config {
    private serviceConfig: ServiceConfig;
    private globalServicePortMappings: any;

    constructor(serviceConfig?: ServiceConfig, parsedGlobalServicePortMappings?: any) {
        this.serviceConfig = serviceConfig || staticServiceConfig;
        this.globalServicePortMappings = parsedGlobalServicePortMappings || globalServicePortMappings;
    }

    public get shortName(): string {
        return this.serviceConfig.shortName;
    }

    public get serviceName(): string {
        return this.serviceConfig.serviceName;
    }

    public get trainingDataHeight(): number {
        return 80;
    }

    public get trainingDataWidth(): number {
        return 80;
    }

    public get env() {
        return process.env.NODE_ENV || 'development';
    }

    public get servicePorts(): ServicePorts {
        return this.globalServicePortMappings.hasOwnProperty(this.serviceConfig.serviceName) && this.globalServicePortMappings[this.serviceConfig.serviceName].hasOwnProperty(this.env) ? this.globalServicePortMappings[this.serviceConfig.serviceName][this.env] : { http: 5000, https: 3000 };
    }
}
