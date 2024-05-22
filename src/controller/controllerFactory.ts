import { CharacterTrainerServiceConfig } from '../config';
import { ICharacterTrainerServiceConfig } from '../types/characterTrainerTypes';
import { CharacterTrainingController } from './characterTrainingController';

export class ControllerFactory {
    public static makeCharacterTrainingController(config?: ICharacterTrainerServiceConfig): CharacterTrainingController {
        return new CharacterTrainingController(config || new CharacterTrainerServiceConfig());
    }
}
