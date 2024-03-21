import { Config } from '../config';
import { CharacterTrainingDataStorageDao } from './characterTrainingDataStorageDao';
import { v5 as uuidv5 } from 'uuid';
import fs from 'fs/promises';
import * as fsSync from 'fs';
import { SavedTrainingData } from '../types/trainerTypes';

export class CharacterTrainingLocalDataStorageDao extends CharacterTrainingDataStorageDao {
    private config: Config;
    constructor(config?: Config) {
        super();
        this.config = config || new Config();
    }

    public override async getCurrentTrainingData(character: string): Promise<Map<string, string>> {
        const uuid = uuidv5(character, this.config.serviceUUID);
        const filePath = this.config.storageUrl + '/data/' + uuid + '.json';

        if (!fsSync.existsSync(filePath)) {
            return new Map();
        }

        const fileContent = (await fs.readFile(filePath)).toString();
        const trainingData: any = JSON.parse(fileContent) as SavedTrainingData;

        return new Map(trainingData.data);
    }

    public override async saveData(character: string, newData: Map<string, string>): Promise<void> {
        const uuid = uuidv5(character, this.config.serviceUUID);
        const filePath = this.config.storageUrl + '/data/' + uuid + '.json';

        if (!fsSync.existsSync(this.config.storageUrl + '/data')) {
            await fs.mkdir(this.config.storageUrl + '/data', {recursive: true});
        }

        const output = JSON.stringify({ character, data: Array.from(newData.entries()) } as SavedTrainingData);

        await fs.writeFile(filePath, output);
    }

    public override async deleteData(character: string): Promise<void> {
        const uuid = uuidv5(character, this.config.serviceUUID);
        const filePath = this.config.storageUrl + '/data/' + uuid + '.json';

        if (fsSync.existsSync(filePath)) {
            await fs.unlink(filePath);
        }
    }
}
