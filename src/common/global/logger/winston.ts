import { createLogger, format, transports } from 'winston';
const levels = {
  error: 'error',
  warn: 'warn',
  info: 'log',
  http: 'http',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly',
};

const level = levels.debug;
export const logger = createLogger({
  level: level,

  // defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      filename: 'log.log',
      format: format.combine(
        format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss.SSS' }),
        format.json()
      ),
    }),
  ],
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      level: level,
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss.SSS' }),
        format.printf((v) => {
          return `${v.timestamp} [${v.level}] ${v.message}`;
        })
      ),
      silent: false,
    })
  );
}
