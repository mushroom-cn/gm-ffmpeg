import { logger } from '@common';
import { newFfmpeg } from '../newFfmpeg';

export function pushStream({
  path,
  outputUrl,
  outputOptions,
  onProcessing,
}: {
  path: string;
  outputUrl: string;
  outputOptions: string[];
  onProcessing?: (process: number) => void;
}) {
  outputOptions.push('-threads');
  outputOptions.push('4');

  outputOptions.push('-preset');
  outputOptions.push('veryslow');

  return new Promise<void>((resolve) => {
    newFfmpeg([path], onProcessing)
      .output(outputUrl)
      .outputOptions(outputOptions)
      .on('end', () => {
        logger.log('finished playing.');
        resolve(undefined);
      })
      .run();
  });
}
