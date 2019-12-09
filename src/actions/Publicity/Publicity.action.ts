import { publicityRepository } from '@shared/services/mongodb/repository/Publicity.repository';
import { logger } from '@services/logger';
import {
    SUCCESS_CODE, FAILURE_CODE, SUCCESS_CREATED_MESSAGE,
    FAILURE_CREATED_MESSAGE, FAILURE_FOUND_MESSAGE,
    SUCCESS_UPDATED_MESSAGE, FAILURE_UPDATED_MESSAGE,
    FAILURE_DELETED_MESSAGE, SUCCESS_DELETED_MESSAGE, ERROR_CODE
} from '@shared/constants';
import { PublicityModel } from '@shared/services/mongodb/model/Publicity.model';

const jwt = require('jsonwebtoken');
let ObjectId = require('mongodb').ObjectId;
let TAG = "Publicity";

export class PublicityActions {
    public verifications: PublicityModel[];

    async create(title, photo, link?, photo2?, photo3?) {
        logger.info('action=create collection ' + TAG);
        try {
            await publicityRepository.create(title, photo, link, photo2, photo3);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_CREATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        }
    }

    async  getAll(where = {}) {
        logger.info('action=getAll collection ' + TAG);
        return await publicityRepository.find(where).then(res => {
            return { valid: true, code: SUCCESS_CODE, data: res };
        }).catch(error => {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        });
    }

    async getById(_id: string) {
        logger.info('action=getById collection ' + TAG);
        _id = new ObjectId(_id);
        let currentModel = new PublicityModel();
        this.verifications = await publicityRepository.find({ _id });
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

    async  update(_id: string, Publicity: PublicityModel) {
        logger.info('action=update collection ' + TAG);
        _id = new ObjectId(_id);
        try {
            await publicityRepository.update(Publicity, { _id });
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_UPDATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_UPDATED_MESSAGE + TAG };
        }
    }

    async  delete(_id: string) {
        logger.info('action=delete collection ' + TAG);
        try {
            await publicityRepository.delete(_id);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_DELETED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_DELETED_MESSAGE + TAG };
        }
    }
}