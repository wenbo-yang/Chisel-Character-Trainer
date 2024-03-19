import { Config } from '../config';
import { CharacterTrainingStorageDaoFactory } from '../dao/CharacterTrainingStorageDaoFactory';
import { CharacterTrainingDataStorageDao } from '../dao/characterTraingDataStorageDao';
import { TrainingData } from '../types/trainerTypes';

export class CharacterTrainingDataStorage {
    private config: Config;
    private characterTrainingDataStorageDao: CharacterTrainingDataStorageDao;
    constructor(config?: Config, characterTrainingDataStorageDao?: CharacterTrainingDataStorageDao) {
        this.config = config || new Config();
        this.characterTrainingDataStorageDao = characterTrainingDataStorageDao || CharacterTrainingStorageDaoFactory.makeDataStorageDao(this.config);
    }

    public async saveData(trainingData: TrainingData): Promise<boolean> {
        const currentData = await this.characterTrainingDataStorageDao.getCurrentTrainingData(trainingData.character); z
        
        const newData = new Map([...currentData, ...trainingData.data]);

        if (newData.size > currentData.size) {
            await this.characterTrainingDataStorageDao.saveData(trainingData.character, newData);
            return true;
        }

        return false;
    }
}
