import { aboutUsRepository } from "@shared/services/mongodb/repository/AboutUs.repository";
import {
    SUCCESS_CODE, SUCCESS_CREATED_MESSAGE,
    FAILURE_CODE, FAILURE_CREATED_MESSAGE,
    FAILURE_FOUND_MESSAGE, SUCCESS_UPDATED_MESSAGE,
    FAILURE_UPDATED_MESSAGE,SUCCESS_DELETED_MESSAGE,
    FAILURE_DELETED_MESSAGE
} from "@shared/constants";
import { logger } from "@shared/services/logger";
import { AboutUsModel } from "@shared/services/mongodb/model/AboutUs.model";

//
let TAG = "AboutUs";
let ObjectId = require('mongodb').ObjectId;

export class AboutUsActions {

    private aboutUs: AboutUsModel[];

    async create(title, description) {
        logger.info('action=create collection ' + TAG);
        try {
            await aboutUsRepository.create(title, description);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_CREATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        }
    }

    async  getAll(where = {}) {
        logger.info('action=getAll collection ' + TAG);
        return await aboutUsRepository.find(where).then(res => {
            return { valid: true, code: SUCCESS_CODE, data: res };
        }).catch(error => {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        });
    }

    async getById(_id: string) {
        logger.info('action=getById collection ' + TAG);
        _id = new ObjectId(_id);
        let currentAboutUs = new AboutUsModel();
        this.aboutUs = await aboutUsRepository.find({ _id });
        currentAboutUs = this.aboutUs.shift();
        if (currentAboutUs.active)
            return { valid: true, code: SUCCESS_CODE, data: currentAboutUs };
        else
            return { valid: false, code: FAILURE_CODE, message: FAILURE_FOUND_MESSAGE + TAG };
    }

    async  update(_id: string, aboutUs: AboutUsModel) {
        logger.info('action=update collection ' + TAG);
        _id = new ObjectId(_id);
        try {
            await aboutUsRepository.update(aboutUs, { _id });
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_UPDATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_UPDATED_MESSAGE + TAG };
        }
    }

    async  delete(_id: string) {
        logger.info('action=delete collection ' + TAG);
        try {
            await aboutUsRepository.delete(_id);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_DELETED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_DELETED_MESSAGE + TAG };
        }
    }
}