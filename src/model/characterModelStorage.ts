import { INeuralNetworkJSON } from 'brain.js/dist/neural-network';
import { Config } from '../config';
import { IConfig, ModelTrainingExecution, TrainModelResponse } from '../types/trainerTypes';
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

    public async initiateTraining(): Promise<ModelTrainingExecution> {
        return await this.characterModelStorageDao.initiateTraining();
    }

    public async newDataSaved(): Promise<void> {
        await this.characterModelStorageDao.newDataSaved();
    }
}
