import { CharacterModelStorage } from './characterModelStorage';
import { CharacterTrainingDataStorage } from './characterTrainingDataStorage';
import { IConfig, TRAININGSTATUS, TrainingData } from '../types/trainerTypes';
import { Config } from '../config';
import { v5 as uuidv5 } from 'uuid';

export class CharacterTrainingModel {
    private config: IConfig;
    private characterModelStorage: CharacterModelStorage;
    private characterTrainingDataStorage: CharacterTrainingDataStorage;

    constructor(config?: IConfig, characterModelStorage?: CharacterModelStorage, characterTrainingDataStorage?: CharacterTrainingDataStorage) {
        this.config = config || new Config();
        this.characterModelStorage = characterModelStorage || new CharacterModelStorage(this.config);
        this.characterTrainingDataStorage = characterTrainingDataStorage || new CharacterTrainingDataStorage(this.config);
    }

    public async storeTrainingData(character: string, uncompressedData: string[], compressedData: string[]): Promise<TRAININGSTATUS> {
        // ensure data size //
        // will implement later
        if (uncompressedData.find((d) => d.split('\n').length !== this.config.trainingDataHeight || d.split('\n')[0].length !== this.config.trainingDataWidth)) {
            throw new Error('Data size incompatible, resizing will be implemented later.');
        }

        const data: Map<string, string> = new Map();

        for (let i = 0; i < compressedData.length; i++) {
            const key = uuidv5(compressedData[i], this.config.serviceUUID);
            if (!data.has(key)) {
                data.set(key, compressedData[i]);
            }
        }

        const trainingData: TrainingData = {
            character,
            data,
        };

        const newDataSaved = await this.characterTrainingDataStorage.saveData(trainingData);
        return newDataSaved ? TRAININGSTATUS.CREATED : TRAININGSTATUS.NOCHANGE;
    }
}
