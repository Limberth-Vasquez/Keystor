'use strict';
let express = require('express');
let router = express.Router();
import { logger } from '@services/logger';
import { VerificationKeystorLogActions } from '@actions/VerificationKeystorLog/VerificationKeystorLog.action';
import { FAILURE_CODE, INVALID_PARAMETER_MESSAGE } from '@shared/constants';
const verificationKeystorLogActions = new VerificationKeystorLogActions();

router.get('/', async (req, res) => {
    try {
        let where = { active: true };
        const users = await verificationKeystorLogActions.getAll(where);
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: 'an unexpected error occurred' });
        logger.error('Error trying to get verificationKeystorLog');
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
        const users = await verificationKeystorLogActions.getById(id);
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: 'an unexpected error occurred' });
        logger.error('Error trying to get verificationKeystorLog');
        logger.error(e.message);
    }
});

router.post('/create', async (req, res) => {
    try {
        if (req.body) {
            const requiredParams = [
                'adminID',
                'wareHouseID',
                'observations',
                'aproved',];
            for (let i of requiredParams) {
                if (!Object.keys(req.body).find(item => {
                    return item === i
                })) {
                    return res.status(400).json({ message: 'Missing field ' + i });
                }
            }
            const result = await verificationKeystorLogActions.create(
                req.body.adminID,
                req.body.wareHouseID,
                req.body.observations,
                req.body.aproved);
            res.json(result);
        } else {
            res.status(400).json({ message: 'bad request' });
        }
    } catch (e) {
        res.status(500).json({ message: 'an unexpected error occurred' });
        logger.error('Error trying to create verificationKeystorLog');
        logger.error(e.message);
    }
});

router.put('/', async (req, res) => {
    try {
        if (req.body) {
            const requiredParams = ['id','where'];
            for (let i of requiredParams) {
                if (!Object.keys(req.body).find(item => {
                    return item === i
                })) {
                    return res.status(400).json({ message: 'Missing field ' + i });
                }
            }
            const result = await verificationKeystorLogActions.update(
                req.body.id,
                req.body.where);
            res.json(result);
        } else {
            res.status(400).json({ message: 'bad request' });
        }
    } catch (e) {
        res.status(500).json({ message: 'an unexpected error occurred' });
        logger.error('Error trying to create verificationKeystorLog');
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
                    return res.status(400).json({ message: 'Missing field ' + i });
                }
            }
            const result = await verificationKeystorLogActions.delete(req.body.id);
            res.json(result);
        } else {
            res.status(400).json({ message: 'bad request' });
        }
    } catch (e) {
        res.status(500).json({ message: 'an unexpected error occurred' });
        logger.error('Error trying to create verificationKeystorLog');
        logger.error(e.message);
    }
});
export default router;