export interface TrainRequestBody {
    character: string;
    dataType: TRAININGDATATYPE;
    compression: COMPRESSIONTYPE;
    data: string[];
}

export interface ModelTrainingExecution {
    executionId: string;
    updated: number;
    status: TRAININGSTATUS;
    model?: any;
}

export type TrainResponse = ModelTrainingExecution;

export enum TRAININGSTATUS {
    CREATED = 'CREATED',
    INPROGRESS = 'INPROGRESS',
    FINISHED = 'FINISHED',
    NOCHANGE = 'NOCHANGE',
}

export enum TRAININGDATATYPE {
    BINARYSTRINGWITHNEWLINE = 'BINARYSTRINGWITHNEWLINE',
    PNGIMAGE = 'PNGIMAGE',
    PNGIMAGEPATH = 'PNGIMAGEPATH',
}

export enum COMPRESSIONTYPE {
    GZIP = 'GZIP',
    PLAIN = 'PLAIN',
}

export interface TrainingData {
    character: string;
    data: Map<string, string>;
}

export interface SavedTrainingData {
    character: string;
    data: string[][];
}

export interface ServiceConfig {
    serviceName: string;
    shortName: string;
    storage: Storage[];
}

export interface ServicePorts {
    http: number;
    https: number;
}

export interface Storage {
    env: string;
    url: string;
}

export interface IConfig {
    shortName: string;
    serviceUUID: string;
    serviceName: string;
    trainingDataHeight: number;
    trainingDataWidth: number;
    storageUrl: string;
    env: string;
    servicePorts: ServicePorts;
}
