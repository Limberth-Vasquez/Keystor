'use strict';
let express = require('express');
let router = express.Router();
let TAG = "Contract";
import { logger } from '@services/logger';
import {
    FAILURE_CODE, INVALID_PARAMETER_MESSAGE,
    UNEXPECTED_ERROR_MESSAGE, TRY_ERROR_MESSAGE,
    BAD_REQUEST_MESSAGE, MISSING_FIELD_MESSAGE
} from '@shared/constants';
import { ContractActions } from '@actions/Contract/Contract.action';

const contractActions = new ContractActions();

router.get('/', async (req, res) => {
    try {
        let where = { active: true };
        const users = await contractActions.getAll(where);
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: UNEXPECTED_ERROR_MESSAGE });
        logger.error(TRY_ERROR_MESSAGE + 'get ' + TAG);
        logger.error(e.message);
    }
});

router.get('/id', async (req, res) => {
    try {
        const validParams = ['id'];
        for (let param in req.query) {
            if (!validParams.includes(param)) {
                return res.status(500).json({
                    message: INVALID_PARAMETER_MESSAGE + param,
                    code: FAILURE_CODE
                });
            }
        }
        const id = req.query['id'];
        const users = await contractActions.getById(id);
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: UNEXPECTED_ERROR_MESSAGE });
        logger.error(TRY_ERROR_MESSAGE + 'get ' + TAG);
        logger.error(e.message);
    }
});

router.post('/create', async (req, res) => {
    try {
        if (req.body) {
            const requiredParams = [
                'contractId',
                'warehouseId',
                'userClientID',
                'name',
                'createDate',
                'endDate',
                'costValue',
                'typeService',
                'status',
                'description',
                'aprovedKeystor'];
            for (let i of requiredParams) {
                if (!Object.keys(req.body).find(item => {
                    return item === i
                })) {
                    return res.status(400).json({ message: MISSING_FIELD_MESSAGE + i });
                }
            }
            const result = await contractActions.create(
                req.body.contractId,
                req.body.warehouseId,
                req.body.userClientID,
                req.body.name,
                req.body.createDate,
                req.body.endDate,
                req.body.costValue,
                req.body.typeService,
                req.body.status,
                req.body.description,
                req.body.aprovedKeystor);
            res.json(result);
        } else {
            res.status(400).json({ message: BAD_REQUEST_MESSAGE });
        }
    } catch (e) {
        res.status(500).json({ message: UNEXPECTED_ERROR_MESSAGE });
        logger.error(TRY_ERROR_MESSAGE + 'create ' + TAG);
        logger.error(e.message);
    }
});

router.put('/', async (req, res) => {
    try {
        if (req.body) {
            const requiredParams = ['id', 'values'];
            for (let i of requiredParams) {
                if (!Object.keys(req.body).find(item => {
                    return item === i
                })) {
                    return res.status(400).json({ message: MISSING_FIELD_MESSAGE + i });
                }
            }
            const result = await contractActions.update(
                req.body.id,
                req.body.where);
            res.json(result);
        } else {
            res.status(400).json({ message: BAD_REQUEST_MESSAGE });
        }
    } catch (e) {
        res.status(500).json({ message: UNEXPECTED_ERROR_MESSAGE });
        logger.error(TRY_ERROR_MESSAGE + 'update ' + TAG);
        logger.error(e.message);
    }
});

router.delete('/', async (req, res) => {
    try {
        if (req.body) {
            const requiredParams = ['id'];
            for (let i of requiredParams) {
                if (!Object.keys(req.body).find(item => {
                    return item === i
                })) {
                    return res.status(400).json({ message: MISSING_FIELD_MESSAGE + i });
                }
            }
            const result = await contractActions.delete(req.body.id);
            res.json(result);
        } else {
            res.status(400).json({ message: BAD_REQUEST_MESSAGE });
        }
    } catch (e) {
        res.status(500).json({ message: UNEXPECTED_ERROR_MESSAGE });
        logger.error(TRY_ERROR_MESSAGE + 'delete ' + TAG);
        logger.error(e.message);
    }
});

export default router;
