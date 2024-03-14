
export interface TrainRequestBody {
    character: string;
    type: string;
    compressiong: string;
    data: string[];
}

export enum TRAININGSTATUS {
    CREATED = 'CREATED',
    INPROGRESS = 'INPROGRESS',
    FINISHED = 'FINISHED'
}

export interface TrainResponse {
    executionId: string;
    status: TRAININGSTATUS;
} 

