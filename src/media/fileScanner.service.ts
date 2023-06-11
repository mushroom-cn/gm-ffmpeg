import { logger, runSchedule } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'fs';
import { groupBy } from 'lodash';
import path, { basename, extname, join, parse } from 'path';
import { In } from 'typeorm';
import { MediaDto } from './dto';
import { pushHlsStream, queryMetaAsync, screentshotAsync } from './ffmpeg';
import { MediaService } from './media.service';
import { getStaticRoot } from './media.static';
@Injectable()
export class FileScanner {
  constructor(
    @Inject(MediaService)
    private mediaService: MediaService,
  ) {
    this.postContructor();
  }

  private postContructor() {
    runSchedule({
      opt: { hour: 6 },
      onTick: () =>
        this.scann({
          source: '/Users/andersonyli/Downloads',
          ext: ['.mp4'],
          target: getStaticRoot(),
        }),
    });
  }

  private async scann({
    source,
    target,
    ext,
  }: {
    source: string;
    target?: string;
    ext: string[];
  }) {
    const extSet = new Set<string>(ext);
    const medias = scann(source, extSet);
    const [existed] = await this.mediaService.find({
      where: { path: In(medias) },
    });
    const mediaMap = groupBy(existed, (v) => v.path);
    const newMedias = medias.filter((v) => !mediaMap[v]);
    if (!newMedias.length) {
      logger.info('No media found.');
      return;
    }
    await Promise.allSettled(
      newMedias.map(async (mediaPath) => {
        const fileTarget = target
          ? join(target, basename(mediaPath))
          : join(parse(mediaPath).dir);
        if (!existsSync(fileTarget)) {
          mkdirSync(fileTarget);
        }
        logger.info(`start resove: ${mediaPath}`);
        await pushHlsStream({
          path: mediaPath,
          serverUrl: fileTarget,
        });
        await screentshotAsync([{ path: mediaPath, folder: fileTarget }]);
        const [{ format_name }] = await queryMetaAsync([mediaPath]);
        const dto = new MediaDto();
        dto.name = basename(mediaPath);
        dto.size = readFileSync(mediaPath).length;
        dto.path = mediaPath;
        dto.mediaType = format_name;
        dto.target = fileTarget;
        await this.mediaService.create([dto]);
      }),
    );
  }
}

function scann(p: string, extSet: Set<string>) {
  const result: string[] = [];
  scannCore(p, result, extSet);
  return result;
}

function scannCore(srcpath: string, result: string[], extSet: Set<string>) {
  readdirSync(srcpath)
    .map((file) => path.join(srcpath, file))
    .forEach((path) => {
      if (statSync(path).isDirectory()) {
        scannCore(path, result, extSet);
      } else if (extSet.has(extname(path))) {
        result.push(path);
        logger.debug(`file scanner found: ${path}`);
      }
    });
}
