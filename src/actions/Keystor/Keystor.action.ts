import { keystorRepository } from '@shared/services/mongodb/repository/Keystor.repository';
import { logger } from '@services/logger';
import {
    SUCCESS_CODE, FAILURE_CODE, SUCCESS_CREATED_MESSAGE,
    FAILURE_CREATED_MESSAGE, FAILURE_FOUND_MESSAGE,
    SUCCESS_UPDATED_MESSAGE, FAILURE_UPDATED_MESSAGE,
    FAILURE_DELETED_MESSAGE, SUCCESS_DELETED_MESSAGE
} from '@shared/constants';
import { KeystorModel } from '@shared/services/mongodb/model/Keystor.model';

const jwt = require('jsonwebtoken');
let ObjectId = require('mongodb').ObjectId;
let TAG = "Keystor";

export class KeystorActions {
    public verifications: KeystorModel[];

    async create(
        personalID,
        user,
        name,
        lastName,
        secondLastName,
        email,
        rolID,
        phone?,
        locationID?,
        verificationLogs?
    ) {
        logger.info('action=create collection ' + TAG);
        try {
            await keystorRepository.create( 
                personalID,
                user,
                name,
                lastName,
                secondLastName,
                email,
                phone,
                locationID,
                rolID,
                verificationLogs
                );
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_CREATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        }
    }

    async  getAll(where = {}) {
        logger.info('action=getAll collection ' + TAG);
        return await keystorRepository.find(where).then(res => {
            return { valid: true, code: SUCCESS_CODE, data: res };
        }).catch(error => {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        });
    }

    async getById(_id: string) {
        logger.info('action=getById collection ' + TAG);
        _id = new ObjectId(_id);
        let currentVerification = new KeystorModel();
        this.verifications = await keystorRepository.find({ _id });
        currentVerification = this.verifications.shift();
        if (currentVerification.active)
            return { valid: true, code: SUCCESS_CODE, data: currentVerification };
        else
            return { valid: false, code: FAILURE_CODE, message: FAILURE_FOUND_MESSAGE + TAG };
    }

    async  update(_id: string, Keystor: KeystorModel) {
        logger.info('action=update collection ' + TAG);
        _id = new ObjectId(_id);
        try {
            await keystorRepository.update(Keystor, { _id });
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_UPDATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_UPDATED_MESSAGE + TAG };
        }
    }

    async  delete(_id: string) {
        logger.info('action=delete collection ' + TAG);
        try {
            await keystorRepository.delete(_id);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_DELETED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_DELETED_MESSAGE + TAG };
        }
    }
}