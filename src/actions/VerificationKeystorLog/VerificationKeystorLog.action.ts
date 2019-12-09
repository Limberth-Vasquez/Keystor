import { verificationKeystorLogRepository } from '@shared/services/mongodb/repository/VerificationKeystorLog.repository';
import { logger } from '@services/logger';
import {
    SUCCESS_CODE, FAILURE_CODE, SUCCESS_CREATED_MESSAGE,
    FAILURE_CREATED_MESSAGE, FAILURE_FOUND_MESSAGE,
    SUCCESS_UPDATED_MESSAGE, FAILURE_UPDATED_MESSAGE,
    FAILURE_DELETED_MESSAGE, SUCCESS_DELETED_MESSAGE, ERROR_CODE, MISSING_FIELD_MESSAGE
} from '@shared/constants';
import { VerificationKeystorLogModel } from '@shared/services/mongodb/model/VerificationKeystorLog.model';

const jwt = require('jsonwebtoken');
let ObjectId = require('mongodb').ObjectId;
let TAG = "VerificationKeystorLog";

export class VerificationKeystorLogActions {
    public verifications: VerificationKeystorLogModel[];

    async create(adminID, wareHouseID, observations, aproved) {
        logger.info('action=create collection ' + TAG);
        try {
            await verificationKeystorLogRepository.create(adminID, wareHouseID, observations, aproved);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_CREATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        }
    }

    async  getAll(where = {}) {
        logger.info('action=getAll collection ' + TAG);
        return await verificationKeystorLogRepository.find(where).then(res => {
            return { valid: true, code: SUCCESS_CODE, data: res };
        }).catch(error => {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        });
    }

    async getById(_id: string) {
        logger.info('action=getById collection ' + TAG);
        _id = new ObjectId(_id);
        let currentModel = new VerificationKeystorLogModel();
        this.verifications = await verificationKeystorLogRepository.find({ _id });
        currentModel = this.verifications.shift();
        try {
            if (currentModel && currentModel.active)
                return { valid: true, code: SUCCESS_CODE, data: currentModel };
            else
                return { valid: false, code: FAILURE_CODE, message: FAILURE_FOUND_MESSAGE + TAG };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: ERROR_CODE, message: error };
        }
    }

    async  update(_id: string, verificationKeystorLog: VerificationKeystorLogModel) {
        logger.info('action=update collection ' + TAG);
        _id = new ObjectId(_id);
        try {
            await verificationKeystorLogRepository.update(verificationKeystorLog, { _id });
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_UPDATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_UPDATED_MESSAGE + TAG };
        }
    }

    async  delete(_id: string) {
        logger.info('action=delete collection ' + TAG);
        try {
            await verificationKeystorLogRepository.delete(_id);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_DELETED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_DELETED_MESSAGE + TAG };
        }
    }
}