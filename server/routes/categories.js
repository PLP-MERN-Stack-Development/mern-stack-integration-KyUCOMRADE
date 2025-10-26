const express = require('express');
const router = express.Router();

// Import controller (create one if it doesn't exist)
const { getAllCategories, createCategory } = require('../controllers/categoryController');

// Routes
router.get('/', getAllCategories);
router.post('/', createCategory);

module.exports = router;
