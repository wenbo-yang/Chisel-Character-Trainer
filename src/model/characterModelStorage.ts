import { Config } from '../config';

export class CharacterModelStorage {
    private config: Config;
    constructor(config?: Config) {
        this.config = config || new Config();
    }
}
