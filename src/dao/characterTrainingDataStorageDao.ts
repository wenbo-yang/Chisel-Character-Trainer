export abstract class CharacterTrainingDataStorageDao {
    constructor() {}

    public async getCurrentTrainingData(character: string): Promise<Map<string, string>> {
        throw new Error('getCurrentTrainingData Abstract class');
    }

    public async saveData(character: string, newData: Map<string, string>): Promise<void> {
        throw new Error('saveData Abstract class');
    }

    public async deleteData(character: string): Promise<void> {
        throw new Error('deleteData Abstract class');
    }
}
