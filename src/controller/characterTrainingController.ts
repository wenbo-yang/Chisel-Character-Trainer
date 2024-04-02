import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Config } from '../config';
import { CharacterTrainingModel } from '../model/characterTrainingModel';
import { gzip, ungzip } from 'node-gzip';
import { COMPRESSIONTYPE, IConfig, TRAININGDATATYPE, TRAININGSTATUS, TrainModelResponse, UploadTrainingDataRequestBody } from '../types/trainerTypes';
import { HttpStatusCode } from 'axios';

export class CharacterTrainingController {
    private config: IConfig;
    private characterTrainingModel: CharacterTrainingModel;

    constructor(config?: IConfig, characterTrainingModel?: CharacterTrainingModel) {
        this.config = config || new Config();
        this.characterTrainingModel = characterTrainingModel || new CharacterTrainingModel(this.config);
    }

    public async uploadTrainingData(req: Request<{}, any, any, ParsedQs, Record<string, any>>): Promise<HttpStatusCode> {
        const requestBody = req.body as UploadTrainingDataRequestBody;
        let uncompressedData: string[] = [];
        let compressedData: string[] = [];
        if (requestBody.dataType === TRAININGDATATYPE.BINARYSTRINGWITHNEWLINE) {
            uncompressedData = await this.getDecompressedData(requestBody);
            compressedData = await this.getCompressedData(requestBody);
        } else {
            // need to read and convert data, not implemented yet
            throw new Error('DataType other than BINARYSTRINGWITHNEWLINE are NOT IMPLEMENTED!!!');
        }

        const trainingDataStatus = await this.characterTrainingModel.storeTrainingData(requestBody.character, uncompressedData, compressedData);

        let responseCode = HttpStatusCode.Ok;
        if (trainingDataStatus === TRAININGSTATUS.CREATED) {
            responseCode = HttpStatusCode.Created;
        } else if (trainingDataStatus === TRAININGSTATUS.NOCHANGE) {
            responseCode = HttpStatusCode.AlreadyReported;
        }

        return responseCode;
    }

    public async trainModel(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): Promise<void> {
        throw new Error('Not Implmented');
    }

    private async getDecompressedData(requestBody: UploadTrainingDataRequestBody): Promise<string[]> {
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

    private async getCompressedData(requestBody: UploadTrainingDataRequestBody): Promise<string[]> {
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
