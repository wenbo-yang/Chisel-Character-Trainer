import { INeuralNetworkJSON } from 'brain.js/dist/neural-network';
import { Config } from '../config';
import { IConfig, ModelTrainingExecution, TRAININGSTATUS, TrainModelResponse } from '../types/trainerTypes';
import { CharacterModelStorageDao } from '../dao/characterModelStorageDao';
import { CharacterStorageDaoFactory } from '../dao/characterStorageDaoFactory';

export class CharacterModelStorage {
    private config: IConfig;
    private characterModelStorageDao: CharacterModelStorageDao;
    constructor(config?: IConfig, characterModelStorageDao?: CharacterModelStorageDao) {
        this.config = config || new Config();
        this.characterModelStorageDao = characterModelStorageDao || CharacterStorageDaoFactory.makeModelStorageDao(this.config);
    }

    public async getCharacterModel(): Promise<INeuralNetworkJSON> {
        throw new Error('getCharacterModel Not Implemented');
    }

    public async createTrainingSession(): Promise<ModelTrainingExecution> {
        return await this.characterModelStorageDao.createTrainingSession();
    }

    public async startModelTraining(): Promise<ModelTrainingExecution> {
        const latestModel = await this.characterModelStorageDao.getLatestModel();

        if (latestModel.status === TRAININGSTATUS.FINISHED) {
            return latestModel;
        }

        return await this.characterModelStorageDao.changeTrainingModelStatus(latestModel.executionId, TRAININGSTATUS.INPROGRESS);
    }

    public async saveModel(executionId: string, modelToBeSaved: INeuralNetworkJSON): Promise<void> {
        await this.characterModelStorageDao.saveModel(executionId, modelToBeSaved);
    }
}
