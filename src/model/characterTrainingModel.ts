import { Config } from '../config';
import { TRAININGSTATUS, TrainResponse, TrainingData } from '../types/trainerTypes';
import { CharacterModelStorage } from './characterModelStorage';
import { CharacterTrainingDataStorage } from './characterTrainingDataStorage';
import { v5 as uuidv5 } from 'uuid';

export class CharacterTrainingModel {
    private config: Config;
    private characterModelStorage: CharacterModelStorage;
    private characterTrainingDataStorage: CharacterTrainingDataStorage;

    constructor(config?: Config, characterModelStorage?: CharacterModelStorage, characterTrainingDataStorage?: CharacterTrainingDataStorage) {
        this.config = config || new Config();
        this.characterModelStorage = characterModelStorage || new CharacterModelStorage(this.config);
        this.characterTrainingDataStorage = characterTrainingDataStorage || new CharacterTrainingDataStorage(this.config);
    }

    public async storeTrainingData(character: string, uncompressedData: string[], compressedData: string[]): Promise<TrainResponse> {
        // ensure data size //
        // will implement later
        if (uncompressedData.find(d => d.split('\n').length !== this.config.trainingDataHeight || d.split('\n')[0].length !== this.config.trainingDataWidth)) {
            throw new Error('Data size incompatible');
        }

        const data: Map<string, string>  = new Map();

        for (let i = 0; i< compressedData.length; i++) {
            const key = uuidv5(compressedData[i], character);
            if (!data.has(key)) {
                data.set(key, compressedData[i]);
            }
        }

        const trainingData: TrainingData = {
            character,
            data
        }

        const newDataSaved = await this.characterTrainingDataStorage.saveData(trainingData);

        const modelStatus = await this.characterModelStorage.getModelTrainingStatus(newDataSaved);

        return { executionId: 'some_id', status: TRAININGSTATUS.NOCHANGE };
    }
}
