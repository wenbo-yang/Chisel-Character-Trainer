import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import { Config } from './config';
import { ControllerFactory } from './controller/controllerFactory';
import { HttpStatusCode } from 'axios';
import { TRAININGSTATUS } from './types/trainerTypes';

const config = new Config();

const servicePorts = config.servicePorts;

const privateKey = fs.readFileSync('./certs/key.pem');
const certificate = fs.readFileSync('./certs/cert.crt');

const credentials = { key: privateKey, cert: certificate };

process.title = config.shortName;

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.text({ limit: '50mb' }));

app.get('/healthCheck', (req, res) => {
    res.send('i am healthy!!!');
});

app.post('/uploadTrainingData', async (req, res) => {
    try {
        const characterTrainingController = ControllerFactory.makeCharacterTrainingController(config);
        const response = await characterTrainingController.uploadTrainingData(req);
        res.status(response.status === TRAININGSTATUS.NOCHANGE ? HttpStatusCode.AlreadyReported : HttpStatusCode.Created).send(response);
    } catch (e) {
        console.log(e as Error);
        res.status(HttpStatusCode.InternalServerError).send(e);
    }
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(servicePorts.https, () => {
    console.log(`https server is listening at port ${servicePorts.https}`);
});

httpServer.listen(servicePorts.http, () => {
    console.log(`http server is listening at port ${servicePorts.http}`);
});
