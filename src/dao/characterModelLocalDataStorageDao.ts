import { Config } from '../config';
import { IConfig, ModelTrainingExecution, TRAININGSTATUS } from '../types/trainerTypes';
import { CharacterModelStorageDao } from './characterModelStorageDao';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import fsSync, { Mode } from 'fs';
import path from 'path';
import { deleteAllFilesInFolder } from './daoUtils';

export class CharacterModelLocalDataStorageDao extends CharacterModelStorageDao {
    private config: IConfig;
    constructor(config?: IConfig) {
        super();
        this.config = config || new Config();
    }

    public override async getLatestModel(): Promise<ModelTrainingExecution> {
        const executions = await this.getExecutions();

        return executions.length > 0 ? executions[0].execution : this.notFoundError();
    }

    public override async getLatestModelByStatus(status: TRAININGSTATUS): Promise<ModelTrainingExecution | undefined> {
        const executions = await this.getExecutions();
        const first = executions.find((e) => e.execution.status === status);

        return first?.execution;
    }

    public override async createTrainingSession(): Promise<ModelTrainingExecution> {
        if (!fsSync.existsSync(this.folderPath)) {
            await fs.mkdir(this.config.storageUrl + '/model', { recursive: true });
        }

        const existingExecutions = await this.getExecutions();
        const first = existingExecutions.find((e) => e.execution.status === TRAININGSTATUS.CREATED);

        let filePath = '';
        let execution = {};
        if (first) {
            filePath = first.filePath;
            execution = { ...first, updated: Date.now() };
        } else {
            filePath = path.join(this.folderPath, 'model_' + Date.now() + '.json');
            execution = { executionId: uuidv4(), updated: Date.now(), status: TRAININGSTATUS.CREATED } as ModelTrainingExecution;
        }

        await fs.writeFile(filePath, JSON.stringify(execution));

        return execution as ModelTrainingExecution;
    }

    public override async changeTrainingModelStatus(executionId: string, status: TRAININGSTATUS): Promise<ModelTrainingExecution> {
        const executions = await this.getExecutions();

        const targetExecution = executions.find((e) => e.execution.executionId === executionId);
        const execution = targetExecution ? ({ ...targetExecution.execution, status } as ModelTrainingExecution) : this.notFoundError();

        await fs.writeFile(path.join(this.folderPath), JSON.stringify(execution));

        return execution;
    }

    public override async deleteAllTrainingExecutions(): Promise<void> {
        const folderPath = this.config.storageUrl + '/model';

        await deleteAllFilesInFolder(folderPath);
    }

    private get folderPath(): string {
        return this.config.storageUrl + '/model';
    }

    private async getExecutions(): Promise<{ execution: ModelTrainingExecution; filePath: string }[]> {
        const executions = [];

        if (fsSync.existsSync(this.folderPath)) {
            const files = await fs.readdir(this.folderPath);

            for (let file of files) {
                const filePath = path.join(this.folderPath, file);
                executions.push({ execution: JSON.parse((await fs.readFile(filePath)).toString()) as ModelTrainingExecution, filePath });
            }

            if (executions.length > 1) {
                executions.sort((a, b) => b.execution.updated - a.execution.updated);
            }
        }

        return executions;
    }

    private notFoundError(): ModelTrainingExecution {
        throw new Error('Not Found');
    }
}
