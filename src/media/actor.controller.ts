import {
  ApiGm7Response,
  BooleanQuery,
  DEFAULT_PAGE_QUERY,
  DataResult,
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
import { ApiBody, ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ActorService } from './actor.service';
import { ActorDto } from './dto';
@Controller('/actors')
@ApiTags('actors')
@ApiExtraModels(DataResult)
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  @ApiBody({
    type: ActorDto,
  })
  create(@Body() actor: ActorDto) {
    return this.actorService.create([actor]);
  }

  @Get()
  @Header('Cache-Control', 'none')
  @ApiQuery({ type: Number, name: 'id' })
  get(@Query('id') id: number) {
    return this.actorService.findById({ ids: [id] });
  }

  @Put()
  @Header('Cache-Control', 'none')
  @ApiBody({ type: ActorDto })
  update(@Body() actor: ActorDto) {
    return this.actorService.update(actor);
  }

  @Delete()
  @ApiQuery({ type: Number, isArray: true, required: true, name: 'ids' })
  @ApiQuery({ type: Boolean, required: false, name: 'force' })
  delete(
    @Query('ids', parseIntArrarPipe) ids: number[],
    @BooleanQuery('force', false) force: boolean
  ) {
    if (force) {
      return this.actorService.delete(ids);
    }
    return this.actorService.softDelete(ids);
  }

  @Get('/list')
  @Header('Cache-Control', 'none')
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
  @ApiGm7Response(ActorDto)
  list(
    @PageQuery('page', DEFAULT_PAGE_QUERY.page)
    page = DEFAULT_PAGE_QUERY.page,
    @PageQuery('pageSize', DEFAULT_PAGE_QUERY.pageSize)
    pageSize = DEFAULT_PAGE_QUERY.pageSize
  ) {
    return this.actorService.find({
      page,
      pageSize,
    });
  }

  @Put('/tag/bind')
  @ApiQuery({ type: Number, name: 'actorId', required: true })
  @ApiQuery({ type: Number, name: 'tagIds', required: true, isArray: true })
  bind(
    @Query('actorId', parseIntPipe)
    actorId: number,
    @Query('tagIds', parseIntArrarPipe) tagIds: number[]
  ) {
    return this.actorService.addTag(actorId, tagIds);
  }

  @Delete('/tag/unbind')
  @ApiQuery({ type: Number, name: 'actorId', required: true })
  @ApiQuery({ type: Number, name: 'tagIds', required: true, isArray: true })
  unbind(
    @Query('actorId', parseIntPipe)
    actorId: number,
    @Query('tagIds', parseIntArrarPipe) tagIds: number[]
  ) {
    return this.actorService.removeTag(actorId, tagIds);
  }
}
