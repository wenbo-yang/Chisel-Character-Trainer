import { Config } from "../config";
import { CharacterTrainingLocalDataStorageDao } from "./CharacterTrainingLocalDataStorageDao";
import { CharacterTrainingDocumentDBDao } from "./characterTrainingDocumentDBDao";

export class CharacterTrainingStorageDaoFactory {
    public static makeDataStorageDao(config: Config) {
        return config.env === 'developement' ? new CharacterTrainingLocalDataStorageDao(config) : new CharacterTrainingDocumentDBDao(config);
    }

}