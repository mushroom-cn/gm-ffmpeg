import { SettingService } from '@base';
import { logger, runSchedule } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readdirSync, statSync, unlink } from 'fs';
import { parse as jsonParse } from 'json5';
import { groupBy } from 'lodash';
import path, { basename, extname, join, parse } from 'path';
import { Equal, In } from 'typeorm';
import { uuid } from 'uuidv4';
import { MediaDto } from './dto';
import { MediaStatus } from './entities/media.entity';
import { pushHlsStream, queryMetaAsync, screentshotAsync } from './ffmpeg';
import { ISetting, RESOURCE_ID } from './interface';
import { MediaService } from './media.service';
import { getStaticRoot } from './media.static';
const STATIC_ROOT = getStaticRoot();
@Injectable()
export class FileScanner {
  private isRunning = false;
  constructor(
    @Inject(MediaService)
    private mediaService: MediaService,
    @Inject(SettingService)
    private settingService: SettingService
  ) {
    this.postContructor();
  }

  private postContructor() {
    runSchedule({
      opt: { hour: 6 },
      onTick: () => this.scann(),
    });
  }

  scann = async () => {
    if (this.isRunning) {
      logger.log(
        'file scanner is running, please try agin later.',
        FileScanner.name
      );
      return;
    }
    try {
      this.isRunning = true;
      const [[dto], totalCount] = await this.settingService.find({
        where: {
          resourceId: Equal(RESOURCE_ID),
        },
      });
      if (!totalCount || !dto?.data) {
        return;
      }
      const setting: ISetting = jsonParse(dto.data);
      const { source, ext } = setting;

      if (!source || !ext?.length) {
        return;
      }
      const extSet = new Set<string>(ext);
      const medias = scann(source, extSet);
      const [existed] = await this.mediaService.find({
        where: { path: In(medias), status: Equal(MediaStatus.Done) },
      });
      const mediaMap = groupBy(existed, (v) => v.path);
      const newMedias = medias.filter((v) => !mediaMap[v]);
      if (!newMedias.length) {
        logger.log('No media found.', FileScanner.name);
        return;
      }
      await newMedias.reduce(async (res, v) => {
        try {
          await res;
        } catch (e) {
          logger.error(e);
        }
        return this.resove(v);
      }, Promise.resolve());
    } catch (e) {
      logger.error(e);
    } finally {
      this.isRunning = false;
    }
  };

  rm = (path: string, exts: string[] = []) => {
    const extMap = Object.fromEntries(exts.map((v) => [v, v]));
    const files = readdirSync(getStaticRoot());
    files
      .map((filename) => join(getStaticRoot(), filename))
      .filter(
        (file) =>
          file.indexOf(path) > -1 && (!exts.length || extMap[extname(file)])
      )
      .forEach((file) => {
        logger.log(`delete file from ${file}`);
        unlink(file, (e) => {
          if (e) {
            logger.error(e);
          }
        });
      });
  };

  toScreenshot = async (entity: MediaDto, timestamp?: string) => {
    this.rm(entity.target, ['.png']);
    entity.status = MediaStatus.Processing;
    await this.mediaService.update(entity);
    await screentshotAsync([
      {
        path: entity.path,
        folder: STATIC_ROOT,
        filename: entity.target,
        timestamp,
      },
    ]);
    entity.status = MediaStatus.Done;
    await this.mediaService.update(entity);
  };

  toM3u8 = async (entity: MediaDto) => {
    this.rm(entity.target, ['.m3u8', '.ts']);
    entity.status = MediaStatus.Processing;
    await this.mediaService.update(entity);
    await pushHlsStream({
      path: entity.path,
      serverUrl: join(STATIC_ROOT, entity.target),
    });
    entity.status = MediaStatus.Done;
    await this.mediaService.update(entity);
  };

  resove = async (mediaPath: string) => {
    const id = uuid();
    const target = getStaticRoot();
    const fileTarget = target ? join(target, id) : join(parse(mediaPath).dir);
    if (!existsSync(target)) {
      mkdirSync(target);
    }
    logger.log(`start resove: ${mediaPath} with ${id}`);
    const [{ format_name, size }] = await queryMetaAsync([mediaPath]);
    const dto = new MediaDto();
    dto.name = basename(mediaPath);
    dto.size = size;
    dto.path = mediaPath;
    dto.mediaType = format_name;
    dto.target = id;
    dto.status = MediaStatus.Created;
    try {
      const [existed] = await this.mediaService.find({
        where: { path: In([mediaPath]) },
      });
      const entity = (
        !existed?.length ? await this.mediaService.create([dto]) : existed
      )[0];
      await this.toScreenshot(entity);
    } catch (error) {
      logger.error(error);
    }
  };
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
