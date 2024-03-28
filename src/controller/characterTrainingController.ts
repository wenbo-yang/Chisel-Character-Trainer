import { Request } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Config } from '../config';
import { CharacterTrainingModel } from '../model/characterTrainingModel';
import { gzip, ungzip } from 'node-gzip';
import { COMPRESSIONTYPE, IConfig, TRAININGDATATYPE, TRAININGSTATUS, TrainRequestBody, TrainResponse } from '../types/trainerTypes';

export class CharacterTrainingController {
    private config: IConfig;
    private characterTrainingModel: CharacterTrainingModel;

    constructor(config?: IConfig, characterTrainingModel?: CharacterTrainingModel) {
        this.config = config || new Config();
        this.characterTrainingModel = characterTrainingModel || new CharacterTrainingModel(this.config);
    }

    public async uploadTrainingData(req: Request<{}, any, any, ParsedQs, Record<string, any>>): Promise<TRAININGSTATUS> {
        const requestBody = req.body as TrainRequestBody;
        let uncompressedData: string[] = [];
        let compressedData: string[] = [];
        if (requestBody.dataType === TRAININGDATATYPE.BINARYSTRINGWITHNEWLINE) {
            uncompressedData = await this.getDecompressedData(requestBody);
            compressedData = await this.getCompressedData(requestBody);
        } else {
            // need to read and convert data, not implemented yet
            throw new Error('DataType other than BINARYSTRINGWITHNEWLINE are NOT IMPLEMENTED!!!');
        }

        const trainingStatus = await this.characterTrainingModel.storeTrainingData(requestBody.character, uncompressedData, compressedData);

        return trainingStatus;
    }

    private async getDecompressedData(requestBody: TrainRequestBody): Promise<string[]> {
        const data: string[] = [];
        if (requestBody.compression === COMPRESSIONTYPE.GZIP) {
            for (let i = 0; i < requestBody.data.length; i++) {
                const ungzipped = await ungzip(Buffer.from(requestBody.data[i], 'base64'));
                data.push(ungzipped.toString());
            }

            return data;
        }

        return requestBody.data;
    }

    private async getCompressedData(requestBody: TrainRequestBody): Promise<string[]> {
        const data: string[] = [];
        if (requestBody.compression === COMPRESSIONTYPE.PLAIN) {
            for (let i = 0; i < requestBody.data.length; i++) {
                const gzipped = (await gzip(Buffer.from(requestBody.data[i]))).toString('base64');
                data.push(gzipped.toString());
            }

            return data;
        }

        return requestBody.data;
    }
}
