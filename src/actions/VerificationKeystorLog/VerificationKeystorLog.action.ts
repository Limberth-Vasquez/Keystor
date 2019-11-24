const jwt = require('jsonwebtoken');
import environment from '@environment/environment';
import { verificationKeystorLogRepository } from '@shared/services/mongodb/repository/VerificationKeystorLog.repository';
import { logger } from '@services/logger';
export class VerificationKeystorLogActions {  
        createKeystor_Log = async (adminID, wareHouseID, observations, aproved) => {
            logger.info('action=createKeystor_Log');
            try {
            return await verificationKeystorLogRepository.createKeystorLog(adminID, wareHouseID, observations, aproved).then( res =>{
                return { valid: true, code: '00', message: 'Success' };
             }).catch(error=>{
                logger.error(error);
                return { valid: false, code: '01', message: error }; 
             });
            } catch (e) {
                logger.error(e);
                return { valid: false, code: '01', message: 'Problem to create log' };
            }
        }
 }