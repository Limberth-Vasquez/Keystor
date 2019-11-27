import { contractStatusRepository } from "@shared/services/mongodb/repository/ContractStatus.repository";
import {
    SUCCESS_CODE, SUCCESS_CREATED_MESSAGE,
    FAILURE_CODE, FAILURE_CREATED_MESSAGE,
    FAILURE_FOUND_MESSAGE, SUCCESS_UPDATED_MESSAGE,
    FAILURE_UPDATED_MESSAGE,SUCCESS_DELETED_MESSAGE,
    FAILURE_DELETED_MESSAGE
} from "@shared/constants";
import { logger } from "@shared/services/logger";
import { ContractStatusModel } from "@shared/services/mongodb/model/ContractStatus.model";

//
let TAG = "ContractStatus";
let ObjectId = require('mongodb').ObjectId;

export class ContractStatusActions {

    private ContractStatus: ContractStatusModel[];

    async create(status) {
        logger.info('action=create collection ' + TAG);
        try {
            await contractStatusRepository.create(status);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_CREATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        }
    }

    async  getAll(where = {}) {
        logger.info('action=getAll collection ' + TAG);
        return await contractStatusRepository.find(where).then(res => {
            return { valid: true, code: SUCCESS_CODE, data: res };
        }).catch(error => {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_CREATED_MESSAGE + TAG };
        });
    }

    async getById(_id: string) {
        logger.info('action=getById collection ' + TAG);
        _id = new ObjectId(_id);
        let currentContractStatus = new ContractStatusModel();
        this.ContractStatus = await contractStatusRepository.find({ _id });
        currentContractStatus = this.ContractStatus.shift();
        if (currentContractStatus.active)
            return { valid: true, code: SUCCESS_CODE, data: currentContractStatus };
        else
            return { valid: false, code: FAILURE_CODE, message: FAILURE_FOUND_MESSAGE + TAG };
    }

    async  update(_id: string, ContractStatus: ContractStatusModel) {
        logger.info('action=update collection ' + TAG);
        _id = new ObjectId(_id);
        try {
            await contractStatusRepository.update(ContractStatus, { _id });
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_UPDATED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_UPDATED_MESSAGE + TAG };
        }
    }

    async  delete(_id: string) {
        logger.info('action=delete collection ' + TAG);
        try {
            await contractStatusRepository.delete(_id);
            return { valid: true, code: SUCCESS_CODE, message: TAG + SUCCESS_DELETED_MESSAGE };
        } catch (error) {
            logger.error(error);
            return { valid: false, code: FAILURE_CODE, message: FAILURE_DELETED_MESSAGE + TAG };
        }
    }
}