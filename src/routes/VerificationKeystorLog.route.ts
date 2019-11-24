'use strict';
let express = require('express');
let router = express.Router();
import { logger } from '@services/logger';
import { VerificationKeystorLogActions } from '@actions/VerificationKeystorLog/VerificationKeystorLog.action';
const verificationKeystorLogActions = new VerificationKeystorLogActions();

router.post('/create', async (req, res) => {
    try {
        if (req.body) {
            const result = await verificationKeystorLogActions.createKeystor_Log(req.body.adminID, req.body.wareHouseID, req.body.observations, req.body.aproved);
            res.json(result);
        } else {
            res.status(400).json({ message: 'bad request' });
        }
    } catch (e) {
        res.status(500).json({ message: 'an unexpected error occurred' });
        logger.error('Error trying to create user');
        logger.error(e.message);
    }
});
export default router;