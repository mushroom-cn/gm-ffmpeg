import { logger } from '@common';
import { dirname } from 'path';
import { newFfmpeg } from './newFfmpeg';

export async function screentshotAsync(
  source: {
    path?: string;
    timestamp?: string;
    folder?: string;
    filename?: string;
  }[]
) {
  const command = newFfmpeg(source.map(({ path }) => path));
  const result = await Promise.allSettled(
    source.map(
      ({ path, timestamp, folder, filename }) =>
        new Promise((resolve, reject) => {
          command
            .on('end', (a, b, c, d) => {
              resolve(null);
            })
            .on('filenames', (filenames) => {
              logger.log(`Will generate: ${filenames.join(', ')}`);
            })
            .screenshots({
              timestamps: [timestamp ?? '00:05:00'],
              filename: `${filename}.png`,
              folder: folder ?? dirname(path),
            });
        })
    )
  );
  return result;
}
