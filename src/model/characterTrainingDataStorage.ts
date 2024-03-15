import { Config } from '../config';

export class CharacterTrainingDataStorage {
    private config: Config;
    constructor(config?: Config) {
        this.config = config || new Config();
    }
}
