'use strict';
let express = require('express');
let router = express.Router();
let TAG = "Rol";
import { logger } from '@services/logger';
import {
    FAILURE_CODE, INVALID_PARAMETER_MESSAGE,
    UNEXPECTED_ERROR_MESSAGE, TRY_ERROR_MESSAGE,
    BAD_REQUEST_MESSAGE, MISSING_FIELD_MESSAGE
} from '@shared/constants';
import { RolActions } from '@actions/Rol/Rol.action';

const rolActions = new RolActions();

router.get('/', async (req, res) => {
    try {
        let where = { active: true };
        const users = await rolActions.getAll(where);
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: UNEXPECTED_ERROR_MESSAGE });
        logger.error(TRY_ERROR_MESSAGE + 'get ' + TAG);
        logger.error(e.message);
    }
});

router.get('/getBy', async (req, res) => {
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
        const users = await rolActions.getById(id);
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
            const requiredParams = ['name'];
            for (let i of requiredParams) {
                if (!Object.keys(req.body).find(item => {
                    return item === i
                })) {
                    return res.status(400).json({ message: MISSING_FIELD_MESSAGE + i });
                }
            }
            const result = await rolActions.create(
                req.body.name);
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
            const result = await rolActions.update(
                req.body.id,
                req.body.values);
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
            const result = await rolActions.delete(req.body.id);
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
