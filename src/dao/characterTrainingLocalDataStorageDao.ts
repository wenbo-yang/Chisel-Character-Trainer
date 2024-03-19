import { Config } from "../config";
import { CharacterTrainingDataStorageDao } from "./characterTraingDataStorageDao";

export class CharacterTrainingLocalDataStorageDao extends CharacterTrainingDataStorageDao {
    private config: Config;
    constructor(config?: Config) {
        super();
        this.config = config || new Config();
    }
}