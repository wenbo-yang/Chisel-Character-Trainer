import { INeuralNetworkJSON } from 'brain.js/dist/neural-network';
import { Config } from '../config';

export class CharacterModelStorage {
    private config: Config;
    constructor(config?: Config) {
        this.config = config || new Config();
    }

    public async getCharacterModel(): Promise<INeuralNetworkJSON> {
        throw new Error('Not Implemented');
    }
}
