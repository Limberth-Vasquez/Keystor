'use strict';
let express = require('express');
let router = express.Router();
router.get('/', (req, res) => {
    res.json({ message: 'Hello from index route' });
});

export default router;