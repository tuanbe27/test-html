const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/formRoutes');
const path = require('path'); // Để xử lý đường dẫn

dotenv.config(); // Tải biến môi trường từ file .env

const app = express();
const PORT = process.env.PORT || 3000;
const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY; // Lấy Site Key

// Middleware để xử lý dữ liệu form (application/x-www-form-urlencoded và application/json)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set view engine cho việc render HTML với biến môi trường (nếu cần)
// Ở đây ta dùng cách đơn giản hơn là thay thế trực tiếp Site Key vào HTML tĩnh
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path, stat) => {
    // Nếu là file HTML, thay thế Site Key vào nội dung
    if (path.endsWith('.html')) {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.end();
          return;
        }
        const replacedData = data.replace(/<%= process.env.RECAPTCHA_SITE_KEY %>/g, RECAPTCHA_SITE_KEY);
        res.setHeader('Content-Type', 'text/html');
        res.send(replacedData);
      });
      return; // Ngăn chặn express.static gửi file gốc
    }
  }
}));


// Định nghĩa route gốc để trả về index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gắn router cho các API liên quan đến form
// Tất cả các route trong formRoutes.js sẽ có tiền tố /api/form
app.use('/api/form', formRoutes);

// Xử lý các lỗi 404
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});