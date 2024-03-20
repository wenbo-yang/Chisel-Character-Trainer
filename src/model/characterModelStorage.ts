import { INeuralNetworkJSON } from 'brain.js/dist/neural-network';
import { Config } from '../config';
import { ModelTrainingStatus, TRAININGSTATUS } from '../types/trainerTypes';
import { v4 as uuidv4 } from 'uuid';
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

    public async getModelTrainingStatus(dataSaved: boolean): Promise<ModelTrainingStatus> {
        return dataSaved ? await this.characterModelStorageDao.initiateTraining() : await this.characterModelStorageDao.getLastestModel();
    }
}
