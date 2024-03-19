import { Config } from '../config';
import { CharacterTrainingLocalDataStorageDao } from './characterTrainingLocalDataStorageDao';
import { CharacterTrainingDocumentDBStorageDao } from './characterTrainingDocumentDBStorageDao';
import { CharacterTrainingDataStorageDao } from './characterTrainingDataStorageDao';
import { CharacterModelStorageDao } from './characterModelStorageDao';
import { CharacterModelLocalDataStorageDao } from './characterModelLocalDataStorageDao';
import { CharacterModelDocumentDBStorageDao } from './characterModelDocumentDBStorageDao';

export class CharacterStorageDaoFactory {
    public static makeTrainingDataStorageDao(config: Config): CharacterTrainingDataStorageDao {
        return config.env === 'developement' ? new CharacterTrainingLocalDataStorageDao(config) : new CharacterTrainingDocumentDBStorageDao(config);
    }

    public static makeModelStorageDao(config: Config): CharacterModelStorageDao {
        return config.env === 'developement' ? new CharacterModelLocalDataStorageDao(config) : new CharacterModelDocumentDBStorageDao(config);
    }
}
