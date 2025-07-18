const express = require('express');
const router = express.Router();
const Journal = require('../models/journal');

router.get('/', async (req, res) => {
  try {
    const journals = await Journal.find().sort({ createdAt: -1 });
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journals', error });
  }
});

router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const newJournal = new Journal({ title, content });

  try {
    const savedJournal = await newJournal.save();
    res.status(201).json(savedJournal);
  } catch (error) {
    res.status(400).json({ message: 'Error creating journal', error });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const journal = await Journal.findById(id);
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    res.status(200).json(journal);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journal', error });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedJournal = await Journal.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedJournal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    res.status(200).json(updatedJournal);
  } catch (error) {
    res.status(400).json({ message: 'Error updating journal', error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJournal = await Journal.findByIdAndDelete(id);
    if (!deletedJournal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    res.status(200).json({ message: 'Journal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting journal', error });
  }
});

module.exports = router;
