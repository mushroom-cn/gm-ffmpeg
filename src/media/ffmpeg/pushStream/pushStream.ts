import { logger } from '@common';
import { newFfmpeg } from '../newFfmpeg';

export function pushStream({
  path,
  outputUrl,
  outputOptions,
}: {
  path: string;
  outputUrl: string;
  outputOptions: string[];
}) {
  outputOptions.push('-threads');
  outputOptions.push('4');

  outputOptions.push('-preset');
  outputOptions.push('veryslow');

  return new Promise<void>((resolve) => {
    newFfmpeg([path])
      .output(outputUrl)
      .outputOptions(outputOptions)
      .on('end', () => {
        logger.info(`finished playing.`);
        resolve(undefined);
      })
      .run();
  });
}
