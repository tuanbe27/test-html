const express = require('express');
const formController = require('../controllers/formController');
const healthController = require('../controllers/healthController');
const multer = require('multer'); // Import multer
const upload = multer(); // Khởi tạo multer (không lưu file vào đĩa)
const router = express.Router();

// Định nghĩa route POST cho việc gửi form
// Route này sẽ là /api/form/submit (do cách mount router trong server.js)
router.post('/submit', upload.none(), formController.submitForm);

router.get('/healthcheck', healthController.checkHealth); // API healthcheck

module.exports = router;