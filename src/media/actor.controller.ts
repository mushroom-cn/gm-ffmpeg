import {
  ApiGm7Response,
  DEFAULT_PAGE_QUERY,
  DataResult,
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
  delete(@Query('ids', parseIntArrarPipe) ids: number[]) {
    return this.actorService.delete(ids);
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
    @Query('page', parseIntPipe) page = DEFAULT_PAGE_QUERY.page,
    @Query('pageSize', parseIntPipe) pageSize = DEFAULT_PAGE_QUERY.pageSize,
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
    @Query('tagIds', parseIntArrarPipe) tagIds: number[],
  ) {
    return this.actorService.addTag(actorId, tagIds);
  }

  @Delete('/tag/unbind')
  @ApiQuery({ type: Number, name: 'actorId', required: true })
  @ApiQuery({ type: Number, name: 'tagIds', required: true, isArray: true })
  unbind(
    @Query('actorId', parseIntPipe)
    actorId: number,
    @Query('tagIds', parseIntArrarPipe) tagIds: number[],
  ) {
    return this.actorService.removeTag(actorId, tagIds);
  }
}
