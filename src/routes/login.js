const express = require('express');
const validateLogin = require('../middleware/validateLogin');

const router = express.Router();

router.post('/', validateLogin, (req, res) => {
    const token = Math.random().toString().substring(0, 16);
    return res.status(200).json({ token });
});

module.exports = router;