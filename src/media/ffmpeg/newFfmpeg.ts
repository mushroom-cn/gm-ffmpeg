import { logger } from '@common';
import ffmpeg from 'fluent-ffmpeg';
import 'winston';

export function newFfmpeg(
  source: string[],
  onProcessing?: (process: number) => void
) {
  const command = ffmpeg({ logger: logger });
  source.map((v) => command.addInput(v));
  return command
    .on('start', (commandLine) => {
      logger.debug(`run: ${commandLine}`);
    })
    .on('progress', function (progress) {
      logger.log(`ffmpeg ${Number(progress.percent).toFixed(2)}%`);
      onProcessing?.(+Number(progress.percent).toFixed(2));
    })
    .on('error', function (err, stdout, stderr) {
      logger.error(err.message);
      logger.error(err.stack);
      logger.error(stderr);
    });
}
