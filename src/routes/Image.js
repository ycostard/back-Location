const express = require('express');
const imageController = require('../controllers/ImageController');

const router = express.Router();
router.get('/images/:filename',imageController.getImageByName);

module.exports = router;