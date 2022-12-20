const express = require('express');
const { readTalkerData, getTalkerById, writeTalkerData } = require('../utils/ultis');
const validateTalker = require('../middleware/validateTalker');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

router.get('/', async (req, res) => {
    const talkers = await readTalkerData();
    res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await getTalkerById(id);
    if (talker) return res.status(200).json(talker);
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/', validateToken, validateTalker, async (req, res) => {
  const newTalker = await writeTalkerData(req.body);
  return res.status(201).json(newTalker);
});

module.exports = router;