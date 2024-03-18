import { Request } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Config } from '../config';
import { CharacterTrainingModel } from '../model/characterTrainingModel';
import { ungzip } from 'node-gzip';
import { COMPRESSIONTYPE, TRAININGDATATYPE, TrainRequestBody, TrainResponse } from '../types/trainerTypes';

export class CharacterTrainingController {
    private config: Config;
    private characterTrainingModel: CharacterTrainingModel;

    constructor(config?: Config, characterTrainingModel?: CharacterTrainingModel) {
        this.config = config || new Config();
        this.characterTrainingModel = characterTrainingModel || new CharacterTrainingModel(this.config);
    }

    public async uploadTrainingData(req: Request<{}, any, any, ParsedQs, Record<string, any>>): Promise<TrainResponse> {
        const requestBody = req.body as TrainRequestBody; 
        let uncompressedData: string[] = [];
        if (requestBody.dataType === TRAININGDATATYPE.BINARYSTRINGWITHNEWLINE) {
            uncompressedData = await this.getUncompressedData(requestBody);
        } else {
            // need to read and convert data
            throw new Error('NOT IMPLEMENTED'); 
        }

        const response = await this.characterTrainingModel.storeTrainingData(uncompressedData);
        
        return response;
    }

    private async getUncompressedData(requestBody: TrainRequestBody): Promise<string[]> {
        const data: string[] = []
        if (requestBody.compression === COMPRESSIONTYPE.GZIP) {
            for (let i = 0; i < requestBody.data.length; i++) {
                const ungzipped = await ungzip(Buffer.from(requestBody.data[i], 'base64'));
                data.push(ungzipped.toString());
            }

            return data;
        }

        return [...requestBody.data];
    }
}
