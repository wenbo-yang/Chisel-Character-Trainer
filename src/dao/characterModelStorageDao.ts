import { ModelTrainingStatus } from '../types/trainerTypes';

export abstract class CharacterModelStorageDao {
    constructor() {}

    public async getLastestModel(): Promise<ModelTrainingStatus> {
        throw new Error('getLastestModel Abstract class');
    }

    public async initiateTraining(): Promise<ModelTrainingStatus> {
        throw new Error('initiateTraining Abstract class');
    }
}
