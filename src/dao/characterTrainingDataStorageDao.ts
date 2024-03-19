export abstract class CharacterTrainingDataStorageDao {
    constructor() {}

    public async getCurrentTrainingData(character: string): Promise<Map<string, string>> {
        throw new Error('Abstract class');
    }

    public async saveData(character: string, newData: Map<string, string>): Promise<void> {
        throw new Error('Abstract class');
    }
}
