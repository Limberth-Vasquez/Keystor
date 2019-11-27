import { userRepository } from '@shared/services/mongodb/repository/User.repository';
import { logger } from '@services/logger';
import {
    SUCCESS_CODE, FAILURE_CODE, SUCCESS_CREATED_MESSAGE,
    FAILURE_CREATED_MESSAGE, FAILURE_FOUND_MESSAGE,
    SUCCESS_UPDATED_MESSAGE, FAILURE_UPDATED_MESSAGE,
    FAILURE_DELETED_MESSAGE, SUCCESS_DELETED_MESSAGE
} from '@shared/constants';
import { UserModel } from '@shared/services/mongodb/model/User.model';

const jwt = require('jsonwebtoken');
let ObjectId = require('mongodb').ObjectId;
let TAG = "User";

export class UserActions {
    public verifications: UserModel[];

    async create(
        user,
            name,
            lastName,
            secondLastName,
            email,
            locationID,
            rolID,       
            phone?,
            personalID?
    ) {
        logger.info('action=create collection ' + TAG);
        try {
            await userRepository.create(                
                user,
            name,
            lastName,
            secondLastName,
            email,
            locationID,
            rolID,       
            phone,
            personalID
            );
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_CREATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        }
    }

    async  getAll(where = {}) {
        logger.info('action=getAll collection ' + TAG);
        return await userRepository.find(where).then(res => {
            return { valid: true, code: SUCCESS_CODE, data: res };
        }).catch(error => {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        });
    }

    async getById(_id: string) {
        logger.info('action=getById collection ' + TAG);
        _id = new ObjectId(_id);
        let currentVerification = new UserModel();
        this.verifications = await userRepository.find({ _id });
        currentVerification = this.verifications.shift();
        if (currentVerification.active)
            return { valid: true, code: SUCCESS_CODE, data: currentVerification };
        else
            return { valid: false, code: FAILURE_CODE, message: FAILURE_FOUND_MESSAGE + TAG };
    }

    async  update(_id: string, User: UserModel) {
        logger.info('action=update collection ' + TAG);
        _id = new ObjectId(_id);
        try {
            await userRepository.update(User, { _id });
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_UPDATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_UPDATED_MESSAGE + TAG };
        }
    }

    async  delete(_id: string) {
        logger.info('action=delete collection ' + TAG);
        try {
            await userRepository.delete(_id);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_DELETED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_DELETED_MESSAGE + TAG };
        }
    }
}