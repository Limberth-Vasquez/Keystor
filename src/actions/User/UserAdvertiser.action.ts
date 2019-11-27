import { logger } from "@shared/services/logger";
import { userAdvertiserRepository } from "@shared/services/mongodb/repository/UserAdvertiser.repository";
import {
    SUCCESS_CODE, SUCCESS_CREATED_MESSAGE,
    FAILURE_CODE, FAILURE_CREATED_MESSAGE,
    FAILURE_FOUND_MESSAGE, SUCCESS_UPDATED_MESSAGE,
    FAILURE_UPDATED_MESSAGE, SUCCESS_DELETED_MESSAGE,
    FAILURE_DELETED_MESSAGE
} from "@shared/constants";
import { UserAdvertiserModel } from "@shared/services/mongodb/model/UserAdvertiser.model";

//
let TAG = "UserAdvertiser";
let ObjectId = require('mongodb').ObjectId;

export class UserAdvertiserActions {
    private UserAdvertiser: UserAdvertiserModel[];

    async create(user, name, lastName, secondLastName, email,
        locationID, rolID, campanyName, idComapany, phone?,
        personalID?, servicesAdvertises?) {
        logger.info('action=create collection ' + TAG);
        try {
            await userAdvertiserRepository.create(user, name, lastName, secondLastName,
                 email, locationID, rolID, campanyName, idComapany, phone, personalID, servicesAdvertises);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_CREATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        }
    }

    async  getAll(where = {}) {
        logger.info('action=getAll collection ' + TAG);
        return await userAdvertiserRepository.find(where).then(res => {
            return { valid: true, code: SUCCESS_CODE, data: res };
        }).catch(error => {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        });
    }
    async getById(_id: string) {
        logger.info('action=getById collection ' + TAG);
        _id = new ObjectId(_id);
        let currentUserAdvertiser = new UserAdvertiserModel();
        this.UserAdvertiser = await userAdvertiserRepository.find({ _id });
        currentUserAdvertiser = this.UserAdvertiser.shift();
        if (currentUserAdvertiser.active)
            return { valid: true, code: SUCCESS_CODE, data: currentUserAdvertiser };
        else
            return { valid: false, code: FAILURE_CODE, message: FAILURE_FOUND_MESSAGE + TAG };
    }

    async  update(_id: string, userAdvertiser: UserAdvertiserModel) {
        logger.info('action=update collection ' + TAG);
        _id = new ObjectId(_id);
        try {
            await userAdvertiserRepository.update(userAdvertiser, { _id });
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_UPDATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_UPDATED_MESSAGE + TAG };
        }
    }

    async  delete(_id: string) {
        logger.info('action=delete collection ' + TAG);
        try {
            await userAdvertiserRepository.delete(_id);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_DELETED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_DELETED_MESSAGE + TAG };
        }
    }
}