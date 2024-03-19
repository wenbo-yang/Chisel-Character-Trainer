import { Config } from '../config';
import { CharacterModelStorageDao } from './characterModelStorageDao';

export class CharacterModelDocumentDBStorageDao extends CharacterModelStorageDao {
    private config: Config;
    constructor(config?: Config) {
        super();
        this.config = config || new Config();
    }
}
