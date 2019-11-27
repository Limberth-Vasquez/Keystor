import { warehouseRepository } from '@shared/services/mongodb/repository/Warehouse.repository';
import { logger } from '@services/logger';
import {
    SUCCESS_CODE, FAILURE_CODE, SUCCESS_CREATED_MESSAGE,
    FAILURE_CREATED_MESSAGE, FAILURE_FOUND_MESSAGE,
    SUCCESS_UPDATED_MESSAGE, FAILURE_UPDATED_MESSAGE,
    FAILURE_DELETED_MESSAGE, SUCCESS_DELETED_MESSAGE, ERROR_CODE
} from '@shared/constants';
import { WarehouseModel } from '@shared/services/mongodb/model/Warehouse.model';

const jwt = require('jsonwebtoken');
let ObjectId = require('mongodb').ObjectId;
let TAG = "Warehouse";

export class WarehouseActions {
    public verifications: WarehouseModel[];

    async create(name,
        email,
        locationID,
        country,
        wareHouseOwnerID,
        timeOpen,
        timeClose,
        capacityPerPallet,
        capacityPerSpace,
        fees1,
        fees2?,
        fees3?,
        photo?,
        photo2?,
        photo3?) {
        logger.info('action=create collection ' + TAG);
        try {
            await warehouseRepository.create(
                name,
                email,
                locationID,
                country,
                wareHouseOwnerID,
                timeOpen,
                timeClose,
                capacityPerPallet,
                capacityPerSpace,
                fees1,
                fees2,
                fees3,
                photo,
                photo2,
                photo3
            );
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_CREATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        }
    }

    async  getAll(where = {}) {
        logger.info('action=getAll collection ' + TAG);
        return await warehouseRepository.find(where).then(res => {
            return { valid: true, code: SUCCESS_CODE, data: res };
        }).catch(error => {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        });
    }

    async getById(_id: string) {
        logger.info('action=getById collection ' + TAG);
        _id = new ObjectId(_id);
        let currentModel = new WarehouseModel();
        this.verifications = await warehouseRepository.find({ _id });
        currentModel = this.verifications.shift();
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

    async  update(_id: string, Warehouse: WarehouseModel) {
        logger.info('action=update collection ' + TAG);
        _id = new ObjectId(_id);
        try {
            await warehouseRepository.update(Warehouse, { _id });
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_UPDATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_UPDATED_MESSAGE + TAG };
        }
    }

    async  delete(_id: string) {
        logger.info('action=delete collection ' + TAG);
        try {
            await warehouseRepository.delete(_id);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_DELETED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_DELETED_MESSAGE + TAG };
        }
    }
}