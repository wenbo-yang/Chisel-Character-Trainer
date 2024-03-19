import { Config } from '../config';
import { CharacterStorageDaoFactory } from '../dao/characterStorageDaoFactory';
import { CharacterTrainingDataStorageDao } from '../dao/characterTrainingDataStorageDao';
import { TrainingData } from '../types/trainerTypes';

export class CharacterTrainingDataStorage {
    private config: Config;
    private characterTrainingDataStorageDao: CharacterTrainingDataStorageDao;
    constructor(config?: Config, characterTrainingDataStorageDao?: CharacterTrainingDataStorageDao) {
        this.config = config || new Config();
        this.characterTrainingDataStorageDao = characterTrainingDataStorageDao || CharacterStorageDaoFactory.makeTrainingDataStorageDao(this.config);
    }

    public async saveData(trainingData: TrainingData): Promise<boolean> {
        const currentData = await this.characterTrainingDataStorageDao.getCurrentTrainingData(trainingData.character);
        const newData = new Map([...currentData, ...trainingData.data]);

        if (newData.size > currentData.size) {
            await this.characterTrainingDataStorageDao.saveData(trainingData.character, newData);
            return true;
        }

        return false;
    }
}
