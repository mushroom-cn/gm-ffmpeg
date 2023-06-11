import { ApiGm7Response, parseIntArrarPipe, parseIntPipe } from '@common';
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
import { MediaService } from './media.service';

@Controller('/media')
@ApiTags('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

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
  @Header('Cache-Control', 'none')
  @ApiQuery({ type: Number, name: 'ids' })
  @ApiGm7Response(MediaDto)
  delete(@Query('ids', parseIntArrarPipe) id: number[]) {
    return this.mediaService.delete(id);
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
    @Query('page', parseIntPipe) page: string,
    @Query('pageSize', parseIntPipe) pageSize: string,
  ) {
    // 返回索引列表
    return this.mediaService.find({
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });
  }

  @Get('/reindex')
  @ApiOkResponse({ type: [MediaDto], isArray: true })
  reindex() {
    // 重建索引
    return;
  }

  @Put('/tag/bind')
  @ApiQuery({ type: Number, name: 'mediaId', required: true })
  @ApiQuery({ type: Number, name: 'tagIds', isArray: true, required: true })
  @ApiGm7Response(MediaDto)
  async tagBind(
    @Query('mediaId', parseIntPipe) mediaId: number,
    @Query('tagIds', parseIntArrarPipe) tagIds: number[],
  ) {
    return [await this.mediaService.addTag(mediaId, tagIds)];
  }

  @Delete('/tag/unbind')
  @ApiQuery({ type: Number, name: 'mediaId', required: true })
  @ApiQuery({ type: Number, name: 'tagIds', isArray: true, required: true })
  async tagUnbind(
    @Query('mediaId', parseIntPipe) mediaId: number,
    @Query('tagIds', parseIntArrarPipe) tagIds: number[],
  ) {
    return [await this.mediaService.removeTag(mediaId, tagIds)];
  }

  @Put('/actor/bind')
  @ApiQuery({ type: Number, name: 'mediaId', required: true })
  @ApiQuery({ type: Number, name: 'actorIds', isArray: true, required: true })
  actorBind(
    @Query('mediaId', parseIntPipe) mediaId: number,
    @Query('actorIds', parseIntArrarPipe) tagIds: number[],
  ) {
    return this.mediaService.addActor(mediaId, tagIds);
  }

  @Delete('/actor/unbind')
  @ApiQuery({ type: Number, name: 'mediaId', required: true })
  @ApiQuery({ type: Number, name: 'actorIds', isArray: true, required: true })
  actorUnbind(
    @Query('mediaId', parseIntPipe) mediaId: number,
    @Query('actorIds', parseIntArrarPipe) actorIds: number[],
  ) {
    return this.mediaService.removeActor(mediaId, actorIds);
  }
}
