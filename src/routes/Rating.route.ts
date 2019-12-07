'use strict';
let express = require('express');
let router = express.Router();
let TAG = "Rating";
import { logger } from '@services/logger';
import {
    FAILURE_CODE, INVALID_PARAMETER_MESSAGE,
    UNEXPECTED_ERROR_MESSAGE, TRY_ERROR_MESSAGE,
    BAD_REQUEST_MESSAGE, MISSING_FIELD_MESSAGE
} from '@shared/constants';
import { RatingActions } from '@actions/Rating/Rating.action';

const ratingActions = new RatingActions();

router.get('/', async (req, res) => {
    try {
        let where = { active: true };
        const result = await ratingActions.getAll(where);
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
        const result = await ratingActions.getById(id);
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
                'description',
                'calification',
                'isPublic',
                'idWhoCreateCalification',
                'idRolWhoCreateCalification',
                'idWhoReceiveCalification',
                'idRolWhoReceiveCalification'];
            for (let i of requiredParams) {
                if (!Object.keys(req.body).find(item => {
                    return item === i
                })) {
                    return res.status(400).json({ message: MISSING_FIELD_MESSAGE + i });
                }
            }
            const result = await ratingActions.create(
                req.body.description,
                req.body.calification,
                req.body.isPublic,
                req.body.idWhoCreateCalification,
                req.body.idRolWhoCreateCalification,
                req.body.idWhoReceiveCalification,
                req.body.idRolWhoReceiveCalification,
            );
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
            const result = await ratingActions.update(
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
            const result = await ratingActions.delete(req.body.id);
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
