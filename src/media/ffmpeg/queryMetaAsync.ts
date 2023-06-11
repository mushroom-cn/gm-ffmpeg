import { logger } from '@common';
import Ffmpeg from 'fluent-ffmpeg';
import { stringify } from 'json5';
import { reject } from 'lodash';
import { newFfmpeg } from './newFfmpeg';
export async function queryMetaAsync(
  source: string[]
): Promise<Ffmpeg.FfprobeFormat[]> {
  const command = newFfmpeg(source);
  return await Promise.allSettled(
    source.map(
      () =>
        new Promise<Ffmpeg.FfprobeFormat>((resolve) => {
          command.ffprobe((err, { format }) => {
            if (err) {
              logger.error(err);
              reject(null);
            } else {
              logger.debug(stringify(format));
              resolve(format);
            }
          });
        })
    )
  ).then((v) => v.map((t) => (t as any).value));
}
