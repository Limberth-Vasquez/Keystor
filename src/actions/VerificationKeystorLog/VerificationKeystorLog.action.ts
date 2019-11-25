const jwt = require('jsonwebtoken');
import environment from '@environment/environment';
import { verificationKeystorLogRepository } from '@shared/services/mongodb/repository/VerificationKeystorLog.repository';
import { logger } from '@services/logger';
import { SUCCESS_CODE, FAILURE_CODE, ERROR_CODE, SUCCESS_MESSAGE, FAILURE_MESSAGE } from '@shared/constants';
export class VerificationKeystorLogActions {  
        createKeystor_Log = async (adminID, wareHouseID, observations, aproved) => {
            logger.info('action=createKeystor_Log');
            try {
            return await verificationKeystorLogRepository.createKeystorLog(adminID, wareHouseID, observations, aproved).then( res =>{
                return { valid: true, code: SUCCESS_CODE, message: 'VerificationKeystorLog'+ SUCCESS_MESSAGE};
             }).catch(error=>{
                logger.error(error);
                return { valid: false, code: ERROR_CODE, message: error }; 
             });
            } catch (e) {
                logger.error(e);
                return { valid: false, code: FAILURE_CODE, message: FAILURE_MESSAGE+'VerificationKeystorLog' };
            }
        }
 }