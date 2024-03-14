import { Request } from 'express-serve-static-core';
import { ParsedQs } from "qs";
import { Config } from "../config";
import { TRAININGSTATUS, TrainRequestBody, TrainResponse } from "../types/trainTypes";

export class CharacterTrainingController {
    private config: Config;

    constructor(config?: Config) {
        this.config = config || new Config();
    }

    public async train(req: Request<{}, any, any, ParsedQs, Record<string, any>>): Promise<TrainResponse> {
        const body = req.body as TrainRequestBody;

        return {
            executionId: 'some_id',
            status: TRAININGSTATUS.CREATED,
        };
    }

}