import { INeuralNetworkJSON } from 'brain.js/dist/neural-network';
import { Config } from '../config';
import { ModelTrainingExecution } from '../types/trainerTypes';
import { CharacterModelStorageDao } from '../dao/characterModelStorageDao';
import { CharacterStorageDaoFactory } from '../dao/characterStorageDaoFactory';

export class CharacterModelStorage {
    private config: Config;
    private characterModelStorageDao: CharacterModelStorageDao;
    constructor(config?: Config, characterModelStorageDao?: CharacterModelStorageDao) {
        this.config = config || new Config();
        this.characterModelStorageDao = characterModelStorageDao || CharacterStorageDaoFactory.makeModelStorageDao(this.config);
    }

    public async getCharacterModel(): Promise<INeuralNetworkJSON> {
        throw new Error('getCharacterModel Not Implemented');
    }

    public async getModelTrainingExecution(dataSaved: boolean): Promise<ModelTrainingExecution> {
        return dataSaved ? await this.characterModelStorageDao.initiateTraining() : await this.characterModelStorageDao.getLastestModel();
    }
}
