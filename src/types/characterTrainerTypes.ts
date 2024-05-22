import { COMPRESSIONTYPE, IConfig, ModelTrainingExecution, Storage, TRAININGDATATYPE } from '../../Chisel-Model-Training/src/types/trainerTypes' 

export interface UploadCharacterTrainingDataRequestBody {
    character: string;
    dataType: TRAININGDATATYPE;
    compression: COMPRESSIONTYPE;
    data: string[];
}

export type TrainModelResponse = ModelTrainingExecution;

export interface ServiceConfig {
    serviceName: string;
    shortName: string;
    storage: Storage[];
}

export interface ServicePorts {
    http: number;
    https: number;
}

export interface ICharacterTrainerServiceConfig extends IConfig {
    shortName: string;
    serviceName: string;
    servicePorts: ServicePorts;
}

export class DoNotRespondError extends Error {
    constructor(e: Error) {
        super(e.message);
    }
}
