const { createLogger, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const dateFormat = () => {
  return new Date(Date.now()).toUTCString();
};

class LoggerService {
  constructor(route) {
    this.route = route;
    const transport = new DailyRotateFile({
      filename: `logs/${route}/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      auditFile: false,
    });

    const logger = createLogger({
      level: 'info',
      // format: format.json(),
      transports: [transport],
      format: format.combine(
        format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(info => `${info.level}: ${info.timestamp}: ${info.message}`),
      ),
    });
    this.logger = logger;
  }


  async info(message, obj) {
    this.logger.log('info', message, {
      obj,
    });
  }


  async debug(message, obj) {
    this.logger.log('debug', message, {
      obj,
    });
  }



  async error(message, obj) {
    this.logger.log('error', message, {
      obj,
    });
  }
}
module.exports = LoggerService;