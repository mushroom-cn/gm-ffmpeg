// import { registerInstrumentations } from '@opentelemetry/instrumentation';
// import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
// import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
// const provider = new NodeTracerProvider();
// provider.register();

// registerInstrumentations({
//   instrumentations: [
//     new WinstonInstrumentation({
//       logHook: (span, record) => {
//         record['resource.service.name'] =
//           provider.resource.attributes['service.name'];
//       },
//     }),
//   ],
// });

import winston from 'winston';
const levels = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  http: 'http',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly',
};

const level = levels.debug;
export const logger = winston.createLogger({
  level: level,
  format: winston.format.json(),
  // defaultMeta: { service: 'user-service' },
  transports: [new winston.transports.File({ filename: 'log.log' })],
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      level: level,
      format: winston.format.simple(),
      silent: false,
    }),
  );
}
