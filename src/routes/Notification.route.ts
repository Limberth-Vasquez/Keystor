'use strict';
let express = require('express');
let router = express.Router();
let TAG = "Notification";
import { logger } from '@services/logger';
import {
    FAILURE_CODE, INVALID_PARAMETER_MESSAGE,
    UNEXPECTED_ERROR_MESSAGE, TRY_ERROR_MESSAGE,
    BAD_REQUEST_MESSAGE, MISSING_FIELD_MESSAGE
} from '@shared/constants';
import { NotificationActions } from '@actions/Notification/Notification.action';

const notificationActions = new NotificationActions();

router.get('/', async (req, res) => {
    try {
        let where = { active: true };
        const result = await notificationActions.getAll(where);
        res.json(result);
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
        const result = await notificationActions.getById(id);
        res.json(result);
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
                'userNotify',
                'userNotified',
                'seenByUser'];
            for (let i of requiredParams) {
                if (!Object.keys(req.body).find(item => {
                    return item === i
                })) {
                    return res.status(400).json({ message: MISSING_FIELD_MESSAGE + i });
                }
            }
            const result = await notificationActions.create(
                req.body.userNotify,
                req.body.userNotified,
                req.body.seenByUser,
                req.body.eventId, 
                req.body.warehouseId);
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
            const result = await notificationActions.update(
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
            const result = await notificationActions.delete(req.body.id);
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