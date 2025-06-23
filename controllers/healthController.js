// controllers/healthController.js

const healthController = {
  /**
   * Kiểm tra trạng thái sức khỏe của ứng dụng.
   * @param {object} req - Đối tượng Request của Express.
   * @param {object} res - Đối tượng Response của Express.
   */
  checkHealth: (req, res) => {
    // Trong một ứng dụng thực tế, bạn có thể kiểm tra:
    // - Kết nối database (ví dụ: ping DB)
    // - Tình trạng các dịch vụ bên ngoài (ví dụ: Redis, message queues)
    // - Trạng thái bộ nhớ, CPU, v.v.

    const uptime = process.uptime(); // Thời gian ứng dụng đã chạy tính bằng giây
    const memoryUsage = process.memoryUsage(); // Thông tin sử dụng bộ nhớ

    // Trả về trạng thái "OK" nếu mọi thứ ổn
    res.status(200).json({
      status: 'OK',
      message: 'Application is running smoothly',
      uptime: `${uptime.toFixed(2)} seconds`,
      memory: {
        rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB (Resident Set Size)`,
        heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB (Total heap allocated)`,
        heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB (Used heap)`,
        external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB (External C++ objects)`
      },
      timestamp: new Date().toISOString()
    });

    // Hoặc nếu có lỗi, bạn có thể trả về 500 Internal Server Error
    // res.status(500).json({ status: 'ERROR', message: 'Database connection failed' });
  }
};

module.exports = healthController;