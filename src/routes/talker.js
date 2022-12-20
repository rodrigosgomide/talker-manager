const express = require('express');
const { 
  readTalkerData, 
  getTalkerById, 
  writeNewTalkerData, 
  editTalkerData,
  deleteTalkerData,
 } = require('../utils/ultis');
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
  const newTalker = await writeNewTalkerData(req.body);
  return res.status(201).json(newTalker);
});

router.put('/:id', validateToken, validateTalker, async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const newTalker = await editTalkerData(id, body);
    return res.status(200).json(newTalker);
  });

  router.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    await deleteTalkerData(id);
    return res.status(204).json();
  });

module.exports = router;