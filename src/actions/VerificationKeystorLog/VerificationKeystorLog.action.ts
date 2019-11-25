const jwt = require('jsonwebtoken');
import environment from '@environment/environment';
import { verificationKeystorLogRepository } from '@shared/services/mongodb/repository/VerificationKeystorLog.repository';
import { logger } from '@services/logger';
import { SUCCESS_CODE, FAILURE_CODE, ERROR_CODE, SUCCESS_CREATED_MESSAGE, FAILURE_CREATED_MESSAGE, SUCCESS_FIND_MESSAGE, FAILURE_FIND_MESSAGE } from '@shared/constants';
import { VerificationKeystorLogModel } from '@shared/services/mongodb/model/VerificationKeystorLog.model';
let ObjectId = require('mongodb').ObjectId;
export class VerificationKeystorLogActions {

    async create(adminID, wareHouseID, observations, aproved) {
        logger.info('action=create Keystor Log');
        try {
            return await verificationKeystorLogRepository.createKeystorLog(adminID, wareHouseID, observations, aproved).then(res => {
                return { valid: true, code: SUCCESS_CODE, message: 'VerificationKeystorLog' + SUCCESS_CREATED_MESSAGE };
            }).catch(error => {
                logger.error(error);
                return { valid: false, code: ERROR_CODE, message: error };
            });
        } catch (e) {
            logger.error(e);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + 'VerificationKeystorLog' };
        }
    }

    async  getAll(where = {}) {
        logger.info('action=getAll Keystor Log');
        return await verificationKeystorLogRepository.find(where);
    }

    async getById(_id: string) {
        logger.info('action=getById Keystor Log');
        try {
            return await verificationKeystorLogRepository.find({ _id }).then(res => {
                return { valid: true, code: SUCCESS_CODE, message: 'VerificationKeystorLog' + SUCCESS_FIND_MESSAGE };
            }).catch(error => {
                logger.error(error);
                return { valid: false, code: ERROR_CODE, message: error };
            });
        } catch (e) {
            logger.error(e);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_FIND_MESSAGE + 'VerificationKeystorLog' };
        }
    }
    async  update(_id : string, verificationKeystorLog: VerificationKeystorLogModel) {
        logger.info('action=update Keystor Log');
        _id = new ObjectId(_id);
        return await verificationKeystorLogRepository.update(verificationKeystorLog, { _id });
    }

}