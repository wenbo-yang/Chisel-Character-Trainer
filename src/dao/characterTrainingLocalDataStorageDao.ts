import { Config } from '../config';
import { CharacterTrainingDataStorageDao } from './characterTrainingDataStorageDao';
import { v5 as uuidv5 } from 'uuid';
import fs from 'fs/promises';
import { TrainingData } from '../types/trainerTypes';

export class CharacterTrainingLocalDataStorageDao extends CharacterTrainingDataStorageDao {
    private config: Config;
    constructor(config?: Config) {
        super();
        this.config = config || new Config();
    }

    public override async getCurrentTrainingData(character: string): Promise<Map<string, string>> {
        const uuid = uuidv5(character, this.config.serviceUUID);
        const filePath = this.config.storageUrl + '/data/' + uuid + '.json';
        const fileContent = (await fs.readFile(filePath)).toString();

        const trainingData: TrainingData = JSON.parse(fileContent, (key, value) => {
            if (key === 'data' && value.dataType === 'Map' && typeof value === 'object') {
                return new Map(value.values);
            }
            return value;
        }) as TrainingData;

        return trainingData.data;
    }

    public override async saveData(character: string, newData: Map<string, string>): Promise<void> {
        const uuid = uuidv5(character, this.config.serviceUUID);

        const filePath = this.config.storageUrl + '/data/' + uuid + '.json';
        const output = JSON.stringify({ character, data: newData } as TrainingData, (key, value) => {
            if (key === 'data' && value instanceof Map) {
                return {
                    dataType: 'Map',
                    values: Array.from(value.entries()), // or with spread: value: [...value]
                };
            }
            return value;
        });

        await fs.writeFile(filePath, output);
    }
}
