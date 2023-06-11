import { logger } from '@common';
import ffmpeg from 'fluent-ffmpeg';
import 'winston';

export function newFfmpeg(source: string[]) {
  const command = ffmpeg({ logger: logger });
  source.map((v) => command.addInput(v));
  return command
    .on('start', (commandLine) => {
      logger.debug(`run: ${commandLine}`);
    })
    .on('progress', function (progress) {
      logger.info(`ffmpeg ${Number(progress.percent).toFixed(2)}%`);
    })
    .on('error', function (err, stdout, stderr) {
      logger.error(err.message);
      logger.error(err.stack);
      logger.error(stderr);
    });
}
