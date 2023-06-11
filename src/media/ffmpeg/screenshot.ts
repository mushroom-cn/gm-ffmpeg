import { logger } from '@common';
import { basename, dirname, extname } from 'path';
import { newFfmpeg } from './newFfmpeg';

export async function screentshotAsync(
  source: {
    path?: string;
    timestamp?: string;
    folder?: string;
  }[],
) {
  const command = newFfmpeg(source.map(({ path }) => path));
  const result = await Promise.allSettled(
    source.map(
      ({ path: filename, timestamp, folder }) =>
        new Promise((resolve, reject) => {
          command
            .on('end', (a, b, c, d) => {
              resolve(null);
            })
            .on('filenames', (filenames) => {
              logger.info(`Will generate: ${filenames.join(', ')}`);
            })
            .screenshots({
              timestamps: [timestamp ?? '00:05:00'],
              filename: `${basename(filename, extname(filename))}.png`,
              folder: folder ?? dirname(filename),
            });
        }),
    ),
  );
  return result;
}
