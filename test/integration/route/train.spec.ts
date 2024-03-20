import { httpsUrl } from '../utils';
import axios, { HttpStatusCode } from 'axios';
import exp from 'constants';
import https from 'https';
import { TRAININGDATATYPE } from '../../../src/types/trainerTypes';

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
            const trainUrl = httpsUrl + '/uploadTrainingData';
            it('should respond with 200 ok with a train request', async () => {
                const response = await axiosClient.post(trainUrl, {
                    character: 'm',
                    dataType: TRAININGDATATYPE.BINARYSTRINGWITHNEWLINE,
                    compression: 'gzip',
                    data: [],
                });

                expect(response.data.executionId).toBeDefined();
                expect(response.status).toEqual(HttpStatusCode.AlreadyReported);
            });
        });
    });
});
