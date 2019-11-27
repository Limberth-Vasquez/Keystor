import { logger } from "@shared/services/logger";
import { contractRepository } from "@shared/services/mongodb/repository/Contract.repository";
import {
    SUCCESS_CODE, SUCCESS_CREATED_MESSAGE,
    FAILURE_CODE, FAILURE_CREATED_MESSAGE,
    FAILURE_FOUND_MESSAGE, SUCCESS_UPDATED_MESSAGE,
    FAILURE_UPDATED_MESSAGE, SUCCESS_DELETED_MESSAGE,
    FAILURE_DELETED_MESSAGE
} from "@shared/constants";
import { ContractModel } from "@shared/services/mongodb/model/Contract.model";

//
let TAG = "Contract";
let ObjectId = require('mongodb').ObjectId;

export class ContractActions {
    private contract: ContractModel[];

    async create(contractId, warehouseId, userClientID, name, createDate, endDate,
        costValue, typeService, status, description, aprovedKeystor) {
        logger.info('action=create collection ' + TAG);
        try {
            await contractRepository.create(contractId, warehouseId, userClientID, name, createDate, endDate,
                costValue, typeService, status, description, aprovedKeystor);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_CREATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        }
    }

    async  getAll(where = {}) {
        logger.info('action=getAll collection ' + TAG);
        return await contractRepository.find(where).then(res => {
            return { valid: true, code: SUCCESS_CODE, data: res };
        }).catch(error => {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        });
    }
    async getById(_id: string) {
        logger.info('action=getById collection ' + TAG);
        _id = new ObjectId(_id);
        let currentContract = new ContractModel();
        this.contract = await contractRepository.find({ _id });
        currentContract = this.contract.shift();
        if (currentContract.active)
            return { valid: true, code: SUCCESS_CODE, data: currentContract };
        else
            return { valid: false, code: FAILURE_CODE, message: FAILURE_FOUND_MESSAGE + TAG };
    }

    async  update(_id: string, contract: ContractModel) {
        logger.info('action=update collection ' + TAG);
        _id = new ObjectId(_id);
        try {
            await contractRepository.update(contract, { _id });
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_UPDATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_UPDATED_MESSAGE + TAG };
        }
    }

    async  delete(_id: string) {
        logger.info('action=delete collection ' + TAG);
        try {
            await contractRepository.delete(_id);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_DELETED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_DELETED_MESSAGE + TAG };
        }
    }
}