const axios = require('axios');

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; // Lấy từ biến môi trường

const recaptchaService = {
  /**
   * Xác minh token reCAPTCHA v3 với Google.
   * @param {string} token - Token reCAPTCHA từ frontend.
   * @param {string} userIp - Địa chỉ IP của người dùng.
   * @returns {Promise<{ success: boolean; score?: number; message?: string }>}
   */
  verifyRecaptcha: async (token, userIp) => {
    if (!RECAPTCHA_SECRET_KEY) {
      console.error('RECAPTCHA_SECRET_KEY is not defined in environment variables.');
      return { success: false, message: 'Server configuration error.' };
    }

    try {
      const googleVerificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
      const verificationResponse = await axios.post(googleVerificationUrl, null, {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
          remoteip: userIp,
        },
      });

      const { success, score, 'error-codes': errorCodes } = verificationResponse.data;

      if (success) {
        const threshold = 0.5; // Ngưỡng điểm số của bạn (tùy chỉnh)
        if (score >= threshold) {
          return { success: true, score: score };
        } else {
          return { success: false, score: score, message: 'reCAPTCHA score too low.' };
        }
      } else {
        return { success: false, message: `reCAPTCHA verification failed: ${errorCodes ? errorCodes.join(', ') : 'Unknown error'}` };
      }
    } catch (error) {
      console.error('Lỗi khi gọi API reCAPTCHA:', error.response ? error.response.data : error.message);
      return { success: false, message: 'Error communicating with reCAPTCHA service.' };
    }
  }
};

module.exports = recaptchaService;