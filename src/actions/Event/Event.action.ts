import { eventRepository } from "@shared/services/mongodb/repository/Event.repository";
import {
    SUCCESS_CODE, SUCCESS_CREATED_MESSAGE,
    FAILURE_CODE, FAILURE_CREATED_MESSAGE,
    FAILURE_FOUND_MESSAGE, SUCCESS_UPDATED_MESSAGE,
    FAILURE_UPDATED_MESSAGE,SUCCESS_DELETED_MESSAGE,
    FAILURE_DELETED_MESSAGE,
    ERROR_CODE
} from "@shared/constants";
import { logger } from "@shared/services/logger";
import { EventModel } from "@shared/services/mongodb/model/Event.model";

//
let TAG = "Event";
let ObjectId = require('mongodb').ObjectId;

export class EventActions {

    private Event: EventModel[];

    async create(
        nameEvent, 
        email,
        phone,
        locationID,
        idUserEvent,
        description,
        fees1,
        createDate,
        startDate,
        endDate,
        fees2?,
        fees3?) {
        logger.info('action=create collection ' + TAG);
        try {
            await eventRepository.create(
                nameEvent, 
                email, 
                phone,
                locationID,
                idUserEvent,
                description,
                fees1,
                createDate,
                startDate,
                endDate,
                fees2,
                fees3);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_CREATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        }
    }

    async  getAll(where = {}) {
        logger.info('action=getAll collection ' + TAG);
        return await eventRepository.find(where).then(res => {
            return { valid: true, code: SUCCESS_CODE, data: res };
        }).catch(error => {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        });
    }

    async getById(_id: string) {
        logger.info('action=getById collection ' + TAG);
        _id = new ObjectId(_id);
        let currentModel = new EventModel();
        this.Event = await eventRepository.find({ _id });
        currentModel = this.Event.shift();
        try {
            if (currentModel && currentModel.active)
                return { valid: true, code: SUCCESS_CODE, data: currentModel };
            else
                return { valid: false, code: FAILURE_CODE, message: FAILURE_FOUND_MESSAGE + TAG };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: ERROR_CODE, message: error};
        }
    }

    async  update(_id: string, Event: EventModel) {
        logger.info('action=update collection ' + TAG);
        _id = new ObjectId(_id);
        try {
            await eventRepository.update(Event, { _id });
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_UPDATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_UPDATED_MESSAGE + TAG };
        }
    }

    async  delete(_id: string) {
        logger.info('action=delete collection ' + TAG);
        try {
            await eventRepository.delete(_id);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_DELETED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_DELETED_MESSAGE + TAG };
        }
    }
}