import { ModelTrainingExecution } from '../types/trainerTypes';

export abstract class CharacterModelStorageDao {
    constructor() {}

    public async getLastestModel(): Promise<ModelTrainingExecution> {
        throw new Error('getLastestModel Abstract class');
    }

    public async initiateTraining(): Promise<ModelTrainingExecution> {
        throw new Error('initiateTraining Abstract class');
    }

    public async deleteAllTrainingExecutions(): Promise<void> {
        throw new Error('deleteAllTrainingExecutions Abstract class');
    }

    public async deleteSelectedTrainingExecution(executionId: string): Promise<void> {
        throw new Error('deleteTrainingExecutions Abstract class');
    }
}
