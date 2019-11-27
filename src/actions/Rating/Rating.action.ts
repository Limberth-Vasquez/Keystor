import { ratingRepository } from '@shared/services/mongodb/repository/Rating.repository';
import { logger } from '@services/logger';
import {
    SUCCESS_CODE, FAILURE_CODE, SUCCESS_CREATED_MESSAGE,
    FAILURE_CREATED_MESSAGE, FAILURE_FOUND_MESSAGE,
    SUCCESS_UPDATED_MESSAGE, FAILURE_UPDATED_MESSAGE,
    FAILURE_DELETED_MESSAGE, SUCCESS_DELETED_MESSAGE
} from '@shared/constants';
import { RatingModel } from '@shared/services/mongodb/model/Rating.model';

const jwt = require('jsonwebtoken');
let ObjectId = require('mongodb').ObjectId;
let TAG = "Rating";

export class RatingActions {
    public verifications: RatingModel[];

    async create(
        description, 
            calification, 
            isPublic, 
            idWhoCreateCalification,
            idRolWhoCreateCalification,
            idWhoReceiveCalification,
            idRolWhoReceiveCalification
    ) {
        logger.info('action=create collection ' + TAG);
        try {
            await ratingRepository.create(
                description, 
            calification, 
            isPublic, 
            idWhoCreateCalification,
            idRolWhoCreateCalification,
            idWhoReceiveCalification,
            idRolWhoReceiveCalification
            );
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_CREATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        }
    }

    async  getAll(where = {}) {
        logger.info('action=getAll collection ' + TAG);
        return await ratingRepository.find(where).then(res => {
            return { valid: true, code: SUCCESS_CODE, data: res };
        }).catch(error => {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        });
    }

    async getById(_id: string) {
        logger.info('action=getById collection ' + TAG);
        _id = new ObjectId(_id);
        let currentVerification = new RatingModel();
        this.verifications = await ratingRepository.find({ _id });
        currentVerification = this.verifications.shift();
        if (currentVerification.active)
            return { valid: true, code: SUCCESS_CODE, data: currentVerification };
        else
            return { valid: false, code: FAILURE_CODE, message: FAILURE_FOUND_MESSAGE + TAG };
    }

    async  update(_id: string, Rating: RatingModel) {
        logger.info('action=update collection ' + TAG);
        _id = new ObjectId(_id);
        try {
            await ratingRepository.update(Rating, { _id });
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_UPDATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_UPDATED_MESSAGE + TAG };
        }
    }

    async  delete(_id: string) {
        logger.info('action=delete collection ' + TAG);
        try {
            await ratingRepository.delete(_id);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_DELETED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_DELETED_MESSAGE + TAG };
        }
    }
}