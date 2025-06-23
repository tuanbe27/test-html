const recaptchaService = require('../services/recaptchaService');

const formController = {
  /**
   * Xử lý việc gửi form và xác minh reCAPTCHA.
   * @param {object} req - Đối tượng Request của Express.
   * @param {object} res - Đối tượng Response của Express.
   */
  submitForm: async (req, res) => {
    const recaptchaToken = req.body['g-recaptcha-response'];
    const userIp = req.ip; // Lấy IP của người dùng

    if (!recaptchaToken) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA token missing.' });
    }

    const verificationResult = await recaptchaService.verifyRecaptcha(recaptchaToken, userIp);

    if (verificationResult.success) {
      // Token hợp lệ và điểm số đủ cao, tiếp tục xử lý form
      // Ví dụ: Lưu dữ liệu vào database, gửi email, v.v.
      console.log('Form data:', req.body); // Dữ liệu form khác
      return res.json({ success: true, message: 'Form submitted successfully!', score: verificationResult.score });
    } else {
      // Token không hợp lệ hoặc điểm số quá thấp
      return res.status(403).json({ success: false, message: verificationResult.message || 'reCAPTCHA verification failed.' });
    }
  }
};

module.exports = formController;