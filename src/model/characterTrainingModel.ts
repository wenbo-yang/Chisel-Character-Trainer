import { Config } from '../config';
import { CharacterModelStorage } from './characterModelStorage';
import { CharacterTrainingDataStorage } from './characterTrainingDataStorage';

export class CharacterTrainingModel {
    private config: Config;
    private characterModelStorage: CharacterModelStorage;
    private characterTrainingDataStorage: CharacterTrainingDataStorage;

    constructor(config?: Config, characterModelStorage?: CharacterModelStorage, characterTrainingDataStorage?: CharacterTrainingDataStorage) {
        this.config = config || new Config();
        this.characterModelStorage = characterModelStorage || new CharacterModelStorage(this.config);
        this.characterTrainingDataStorage = characterTrainingDataStorage || new CharacterTrainingDataStorage(this.config);
    }
}
