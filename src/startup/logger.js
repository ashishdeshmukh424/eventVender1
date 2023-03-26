const { createLogger, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const dateFormat = () => {
  return new Date(Date.now()).toUTCString();
};
// const logger = {
//   initLogger: async () => {
//     // If the project is NOT running in development mode, use the custom logging
//     if (config.logs.enabled) {
//       const logPath = `${path.resolve(__dirname, '../..')}/Logs/`;

//       const date = moment().format('YYYY-MM-DD');

//       const stdOutPath = `${logPath}standardOutput`;
//       const stdErrPath = `${logPath}standardError`;
//       const consoleLogsPath = `${logPath}consoleLogs`;
//       const debugPath = `${logPath}debug`;

//       // create folders for logs
//       mkdirp.sync(stdOutPath);
//       mkdirp.sync(stdErrPath);
//       mkdirp.sync(consoleLogsPath);
//       mkdirp.sync(debugPath);

//       // Create write streams for output files

//       // disable standard output for now
//       // const stdOutAccess = fs.createWriteStream(`${stdOutPath}/${dateOnly}.log`, { flags: 'a' });
//       const stdErrAccess = fs.createWriteStream(`${stdErrPath}/${date}.log`, { flags: 'a' });

//       // Redirect output to write streams
//       // disable standard output for now
//       // process.stdout.write = stdOutAccess.write.bind(stdOutAccess);
//       process.stdout.write = '';
//       process.stderr.write = stdErrAccess.write.bind(stdErrAccess);

//       // Override the default console.log method to redirect it to a write stream
//       // eslint-disable-next-line
//       console.log = message => {
//         const dateOnly = moment().format('YYYY-MM-DD');
//         const timeStamp = moment().format('YYYY-MM-DD HH:mm:ss');
//         const consLogAccess = fs.createWriteStream(`${consoleLogsPath}/${dateOnly}.log`, { flags: 'a' });
//         consLogAccess.write(`${timeStamp} - ${message}\n`);
//       };

//       // Create a global console.debug method and redirect it to a write stream
//       // eslint-disable-next-line
//       console.debug = message => {
//         const dateOnly = moment().format('YYYY-MM-DD');
//         const timeStamp = moment().format('YYYY-MM-DD HH:mm:ss');
//         const consDebugAccess = fs.createWriteStream(`${debugPath}/${dateOnly}.log`, { flags: 'a' });
//         consDebugAccess.write(`${timeStamp} - ${message}\n`);
//       };
//     }
//   },

//   logApiCalls: (requestData, response) => {
//     const logPath = `${path.resolve(__dirname, '../..')}/Logs/`;
//     const dateOnly = moment().format('YYYY-MM-DD');

//     // append time to the request body
//     const request = { time: moment(), request: requestData.request.body, response };

//     // name directories based on request url
//     const exactPath = response && response.success ? `${logPath}${requestData.originalUrl}/succesful` : `${logPath}${requestData.originalUrl}/failed`;

//     // create folder if folder does not exist
//     mkdirp.sync(exactPath);

//     // file name by date only
//     const file = `${exactPath}/${dateOnly}.log`;

//     // flag 'a' appends data to the file and not override
//     const apiRequestLogs = fs.createWriteStream(file, { flags: 'a' });
//     apiRequestLogs.write(`${JSON.stringify(request)},\n`);
//   },
// };

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