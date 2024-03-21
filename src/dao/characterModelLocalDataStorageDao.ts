import { Config } from '../config';
import { ModelTrainingExecution, TRAININGSTATUS } from '../types/trainerTypes';
import { CharacterModelStorageDao } from './characterModelStorageDao';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

export class CharacterModelLocalDataStorageDao extends CharacterModelStorageDao {
    private config: Config;
    constructor(config?: Config) {
        super();
        this.config = config || new Config();
    }

    public override async getLastestModel(): Promise<ModelTrainingExecution> {
        const folderPath = this.config.storageUrl + '/model';
        const executions: ModelTrainingExecution[] = [];

        if (fsSync.existsSync(folderPath)) {
            const files = await fs.readdir(folderPath);

            for (let file of files) {
                executions.push(JSON.parse((await fs.readFile(path.join(folderPath, file))).toString()) as ModelTrainingExecution);
            }

            if (executions.length > 1) {
                executions.sort((a, b) => b.updated - a.updated);
            }
        }

        return executions.length > 0 ? executions[0] : { executionId: 'NO_EXECUTIONS', updated: -1, status: TRAININGSTATUS.NOCHANGE };
    }

    public override async initiateTraining(): Promise<ModelTrainingExecution> {
        const filePath = this.config.storageUrl + '/model/model_' + Date.now() + '.json';

        if (!fsSync.existsSync(this.config.storageUrl + '/model')) {
            await fs.mkdir(this.config.storageUrl + '/model', { recursive: true });
        }

        const newTrainingExecution = { executionId: uuidv4(), updated: Date.now(), status: TRAININGSTATUS.CREATED } as ModelTrainingExecution;
        await fs.writeFile(filePath, JSON.stringify(newTrainingExecution));

        return newTrainingExecution;
    }

    public override async deleteTrainingExecutions(): Promise<void> {
        const folderPath = this.config.storageUrl + '/model';

        if (!fsSync.existsSync(folderPath)) {
            return;
        }

        const files = await fs.readdir(folderPath);

        for (let file of files) {
            await fs.unlink(file);
        }
    }
}
