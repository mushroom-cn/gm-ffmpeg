import {
  ApiGm7Response,
  BooleanQuery,
  DEFAULT_PAGE_QUERY,
  PageQuery,
  parseIntArrarPipe,
  parseIntPipe,
} from '@common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MediaDto } from './dto';
import { FileScanner } from './fileScanner.service';
import { MediaService } from './media.service';

@Controller('/media')
@ApiTags('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private fileScanner: FileScanner
  ) {}

  @Post()
  @ApiBody({
    type: MediaDto,
    required: true,
  })
  @ApiGm7Response(MediaDto)
  create(@Body() media: MediaDto) {
    return this.mediaService.create([media]);
  }

  @Get()
  @Header('Cache-Control', 'none')
  @ApiQuery({ type: String, name: 'id' })
  @ApiGm7Response(MediaDto)
  async get(@Query('id') id) {
    return this.mediaService.findById({ ids: [id] });
  }

  @Put()
  @Header('Cache-Control', 'none')
  @ApiBody({
    type: MediaDto,
    required: true,
  })
  @ApiGm7Response(MediaDto)
  update(@Body() media: MediaDto) {
    return this.mediaService.update(media);
  }

  @Delete()
  @ApiQuery({ type: Number, name: 'ids', isArray: true })
  @ApiQuery({ type: Boolean, required: false, name: 'force' })
  async delete(
    @Query('ids', parseIntArrarPipe) id: number[],
    @BooleanQuery('force', false)
    force: boolean
  ) {
    if (!force) {
      return this.mediaService.softDelete(id);
    }
    const [entries] = await this.mediaService.findById({ ids: id });
    if (!entries?.length) {
      return;
    }
    await this.mediaService.delete(id);
    this.fileScanner.rm(entries[0].target);
  }

  @Put('/restore')
  @Header('Cache-Control', 'none')
  @ApiQuery({ type: Number, name: 'ids' })
  @ApiGm7Response(MediaDto)
  async restore(@Query('ids', parseIntArrarPipe) id: number[]) {
    const media = await this.mediaService.restore(id);
    if (media?.raw?.[0]?.target) {
      this.fileScanner.rm(media.raw[0].target);
    }
    return media;
  }

  @Get('/list')
  @ApiQuery({
    type: Number,
    name: 'page',
    required: false,
    allowEmptyValue: true,
  })
  @ApiQuery({
    type: Number,
    name: 'pageSize',
    required: false,
    allowEmptyValue: true,
  })
  @Header('Cache-Control', 'none')
  @ApiGm7Response(MediaDto)
  async list(
    @PageQuery('page', DEFAULT_PAGE_QUERY.page) page: number,
    @PageQuery('pageSize', DEFAULT_PAGE_QUERY.pageSize)
    pageSize: number
  ) {
    // 返回索引列表
    return this.mediaService.find({
      page,
      pageSize,
    });
  }

  @Get('/rescann')
  @ApiQuery({ name: 'id', type: Number, required: true })
  @ApiQuery({ name: 'time', type: String, required: false })
  @ApiOkResponse({ type: [MediaDto], isArray: true })
  async rescann(
    @Query('id', parseIntPipe) id: number,
    @Query('time') time: string
  ) {
    const [entities] = await this.mediaService.findById({ ids: [id] });
    const entity = entities?.[0];
    if (!entity) {
      return;
    }
    if (time) {
      this.fileScanner.toScreenshot(entity, time);
    }
    this.fileScanner.toM3u8(entity);
  }

  @Get('/scann')
  @ApiOkResponse({ type: [MediaDto], isArray: true })
  async scann() {
    this.fileScanner.scann();
  }

  @Put('/tag/bind')
  @ApiQuery({ type: Number, name: 'mediaId', required: true })
  @ApiQuery({ type: Number, name: 'tagIds', isArray: true, required: true })
  @ApiGm7Response(MediaDto)
  async tagBind(
    @Query('mediaId', parseIntPipe) mediaId: number,
    @Query('tagIds', parseIntArrarPipe) tagIds: number[]
  ) {
    return [await this.mediaService.addTag(mediaId, tagIds)];
  }

  @Delete('/tag/unbind')
  @ApiQuery({ type: Number, name: 'mediaId', required: true })
  @ApiQuery({ type: Number, name: 'tagIds', isArray: true, required: true })
  async tagUnbind(
    @Query('mediaId', parseIntPipe) mediaId: number,
    @Query('tagIds', parseIntArrarPipe) tagIds: number[]
  ) {
    return [await this.mediaService.removeTag(mediaId, tagIds)];
  }

  @Put('/actor/bind')
  @ApiQuery({ type: Number, name: 'mediaId', required: true })
  @ApiQuery({ type: Number, name: 'actorIds', isArray: true, required: true })
  actorBind(
    @Query('mediaId', parseIntPipe) mediaId: number,
    @Query('actorIds', parseIntArrarPipe) tagIds: number[]
  ) {
    return this.mediaService.addActor(mediaId, tagIds);
  }

  @Delete('/actor/unbind')
  @ApiQuery({ type: Number, name: 'mediaId', required: true })
  @ApiQuery({ type: Number, name: 'actorIds', isArray: true, required: true })
  actorUnbind(
    @Query('mediaId', parseIntPipe) mediaId: number,
    @Query('actorIds', parseIntArrarPipe) actorIds: number[]
  ) {
    return this.mediaService.removeActor(mediaId, actorIds);
  }
}
