import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Config } from '../config';
import { TRAININGSTATUS, TrainRequestBody, TrainResponse } from '../types/trainTypes';
import { CharacterTrainingModel } from '../model/characterTrainingModel';
import { HttpStatusCode } from 'axios';

export class CharacterTrainingController {
    private config: Config;

    constructor(config?: Config, characterTrainingModel?: CharacterTrainingModel) {
        this.config = config || new Config();
    }

    public async train(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): Promise<void> {
        const body = req.body as TrainRequestBody;

        const response: TrainResponse = {
            executionId: 'some_id',
            status: TRAININGSTATUS.CREATED,
        };

        res.status(HttpStatusCode.Created).send(response);
        await this.trainCharacterModel();
    }

    private async trainCharacterModel(): Promise<void> {
        return;
    }
}
