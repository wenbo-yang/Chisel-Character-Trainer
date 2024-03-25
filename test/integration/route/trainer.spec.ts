import { httpsUrl, integrationTestConfig } from '../utils';
import axios, { HttpStatusCode } from 'axios';
import https from 'https';
import fs from 'fs/promises';
import { COMPRESSIONTYPE, TRAININGDATATYPE } from '../../../src/types/trainerTypes';
import { CharacterStorageDaoFactory } from '../../../src/dao/characterStorageDaoFactory';

const axiosClient = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});

describe('skeletonize request', () => {
    describe('GET /healthCheck', () => {
        it('should respond with 200', async () => {
            const response = await axiosClient.get(httpsUrl + '/healthCheck');

            expect(response.status).toBe(200);
            expect(response.data).toBe('i am healthy!!!');
        });
    });

    describe('training character', () => {
        describe('POST /uploadTrainingData', () => {
            const uploadTrainingDataUrl = httpsUrl + '/uploadTrainingData';

            beforeAll(() => {
                process.env.NODE_ENV = 'development';
            });

            afterAll(() => {
                const modelStorage = CharacterStorageDaoFactory.makeModelStorageDao(integrationTestConfig);
                const trainingDataStroage = CharacterStorageDaoFactory.makeTrainingDataStorageDao(integrationTestConfig);

                // modelStorage.deleteAllTrainingExecutions();
                // trainingDataStroage.deleteAllTrainingData();
            });

            it('should respond with 201 created with new train request', async () => {
                const dataUrl = './test/integration/data/skeletonized_data_for_character_training_test.json';
                const data = JSON.parse((await fs.readFile(dataUrl)).toString());

                const response = await axiosClient.post(uploadTrainingDataUrl, {
                    character: '走',
                    dataType: TRAININGDATATYPE.BINARYSTRINGWITHNEWLINE,
                    compression: COMPRESSIONTYPE.PLAIN,
                    data: [data.strokes.find((s: any) => s.type === 'ORIGINAL').stroke]
                });

                expect(response.data.executionId).toBeDefined();
                expect(response.status).toEqual(HttpStatusCode.Created);
            });

            it('should respond with 201 created with new data request of the same character', async () => {
                const dataUrl = './test/integration/data/skeletonized_data_for_character_training_test.json';
                const data = JSON.parse((await fs.readFile(dataUrl)).toString());

                const response = await axiosClient.post(uploadTrainingDataUrl, {
                    character: '走',
                    dataType: TRAININGDATATYPE.BINARYSTRINGWITHNEWLINE,
                    compression: COMPRESSIONTYPE.PLAIN,
                    data: [data.skeleton, data.strokes.find((s: any) => s.type === 'ORIGINAL').stroke]
                });

                expect(response.data.executionId).toBeDefined();
                expect(response.status).toEqual(HttpStatusCode.Created);
            });
        });
    });
});
