import { ModelTrainingExecution, TRAININGSTATUS } from '../types/trainerTypes';

export abstract class CharacterModelStorageDao {
    constructor() {}

    public async getLatestModel(): Promise<ModelTrainingExecution> {
        throw new Error('getLastestModel Abstract class');
    }

    public async getLatestModelByStatus(status: TRAININGSTATUS): Promise<ModelTrainingExecution | undefined> {
        throw new Error('getLastestModel Abstract class');
    }

    public async createTrainingSession(): Promise<ModelTrainingExecution> {
        throw new Error('initiateTraining Abstract class');
    }

    public async deleteAllTrainingExecutions(): Promise<void> {
        throw new Error('deleteAllTrainingExecutions Abstract class');
    }

    public async deleteSelectedTrainingExecution(executionId: string): Promise<void> {
        throw new Error('deleteTrainingExecutions Abstract class');
    }

    public async changeTrainingModelStatus(executionId: string, INPROGRESS: TRAININGSTATUS): Promise<ModelTrainingExecution> {
        throw new Error('Method not implemented.');
    }
}
