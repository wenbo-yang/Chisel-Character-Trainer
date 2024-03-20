export interface TrainRequestBody {
    character: string;
    dataType: TRAININGDATATYPE;
    compression: COMPRESSIONTYPE;
    data: string[];
}

export interface ModelTrainingStatus {
    executionId: string;
    status: TRAININGSTATUS;
}

export type TrainResponse = ModelTrainingStatus;

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
