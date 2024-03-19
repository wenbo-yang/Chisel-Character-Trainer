import { Config } from '../config';
import { CharacterTrainingDataStorageDao } from './characterTrainingDataStorageDao';

export class CharacterTrainingDocumentDBStorageDao extends CharacterTrainingDataStorageDao {
    private config: Config;
    constructor(config?: Config) {
        super();
        this.config = config || new Config();
    }
}
