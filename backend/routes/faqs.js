const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Faq = require('../models/Faq');

// Get all FAQs
router.get('/', async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single FAQ by ID
router.get('/:id', async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });
    res.json(faq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new FAQ
router.post('/', async (req, res) => {
  const faq = new Faq({
    question: req.body.question,
    answer: req.body.answer,
  });
  try {
    const newFaq = await faq.save();
    res.status(201).json(newFaq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an FAQ
router.put('/:id', async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });

    faq.question = req.body.question || faq.question;
    faq.answer = req.body.answer || faq.answer;

    const updatedFaq = await faq.save();
    res.json(updatedFaq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an FAQ
router.delete('/faqs/:id', async (req, res) => {
    try {
      // Validate the ID
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid FAQ ID' });
      }
  
      // Attempt to find and delete the FAQ
      const deletedFaq = await Faq.findByIdAndDelete(req.params.id);
      if (!deletedFaq) {
        return res.status(404).json({ message: 'FAQ not found' });
      }
  
      res.status(200).json({ message: 'FAQ deleted successfully' });
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;

module.exports = router;
