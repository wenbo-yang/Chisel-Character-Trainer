import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { CharacterTrainerServiceConfig } from '../config';
import { DoNotRespondError, ICharacterTrainerServiceConfig, UploadCharacterTrainingDataRequestBody } from '../types/characterTrainerTypes';
import { HttpStatusCode } from 'axios';
import { ModelTrainingExecution, NotFoundError, TRAININGSTATUS, UploadTrainingData } from '../../Chisel-Model-Training/src/types/trainerTypes';
import { ModelTrainingController } from '../../Chisel-Model-Training/src/controller/modelTrainingController';

export class CharacterTrainingController extends ModelTrainingController {
    constructor(config?: ICharacterTrainerServiceConfig) {
        super(config || new CharacterTrainerServiceConfig());
    }

    public async uploadCharacterTrainingData(req: Request<{}, any, any, ParsedQs, Record<string, any>>): Promise<HttpStatusCode> {
        const requestBody = req.body as UploadCharacterTrainingDataRequestBody;

        const trainingDataStatus = await super.uploadTrainingData(this.convertUploadTrainingDataToCompatibleWithBaseClass(requestBody));

        let responseCode = HttpStatusCode.Ok;
        if (trainingDataStatus === TRAININGSTATUS.CREATED) {
            responseCode = HttpStatusCode.Created;
        } else if (trainingDataStatus === TRAININGSTATUS.NOCHANGE) {
            responseCode = HttpStatusCode.AlreadyReported;
        }

        return responseCode;
    }

    public async trainCharacterModel(res: Response<any, Record<string, any>, number>): Promise<void> {
        const modelTrainingExecution = await super.startModelTraining();
        if (modelTrainingExecution.status === TRAININGSTATUS.FINISHED) {
            res.status(HttpStatusCode.AlreadyReported).send(modelTrainingExecution);
        } else {
            res.status(HttpStatusCode.Created).send(modelTrainingExecution);
        }

        try {
            await super.trainModel(modelTrainingExecution.executionId);
        } catch (e) {
            throw new DoNotRespondError(e as Error);
        }
    }

    public async getCharacterModelTrainingExecution(req: Request<{ executionId: string }, any, any, ParsedQs, Record<string, any>>): Promise<ModelTrainingExecution> {
        return await super.getModelTrainingExecution(req.params.executionId);
    }

    public async getLatestCharacterTrainedModel(res: Response<any, Record<string, any>, number>): Promise<void> {
        try {
            const fsReadStream = await super.getLatestTrainedModel();
            fsReadStream.pipe(res);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw e;
            } else {
                throw new DoNotRespondError(e as Error);
            }
        }
    }

    public async getTrainedCharacterModelByExecutionId(req: Request<{ executionId: string }, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): Promise<void> {
        try {
            const executionId = req.params.executionId;

            const fsReadStream = await super.getTrainedModelByExecutionId(executionId);
            fsReadStream.pipe(res);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw e;
            } else {
                throw new DoNotRespondError(e as Error);
            }
        }
    }

    private convertUploadTrainingDataToCompatibleWithBaseClass(requestBody: UploadCharacterTrainingDataRequestBody): UploadTrainingData {
        return {
            model: requestBody.character,
            compression: requestBody.compression,
            data: requestBody.data,
            dataType: requestBody.dataType,
        } as UploadTrainingData;
    }
}
