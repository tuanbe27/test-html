const express = require('express');
const formController = require('../controllers/formController');
const healthController = require('../controllers/healthController');
const router = express.Router();

// Định nghĩa route POST cho việc gửi form
// Route này sẽ là /api/form/submit (do cách mount router trong server.js)
router.post('/submit', formController.submitForm);

router.get('/healthcheck', healthController.checkHealth); // API healthcheck

module.exports = router;