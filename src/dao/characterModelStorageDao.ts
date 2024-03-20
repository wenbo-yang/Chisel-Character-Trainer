import { ModelTrainingExecution } from '../types/trainerTypes';

export abstract class CharacterModelStorageDao {
    constructor() {}

    public async getLastestModel(): Promise<ModelTrainingExecution> {
        throw new Error('getLastestModel Abstract class');
    }

    public async initiateTraining(): Promise<ModelTrainingExecution> {
        throw new Error('initiateTraining Abstract class');
    }

    public async deleteTrainingExecutions(): Promise<void> {
        throw new Error('deleteTrainingExecutions Abstract class');
    }
}
