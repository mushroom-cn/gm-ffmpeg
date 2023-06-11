import { BooleanQuery, DEFAULT_PAGE_QUERY, PageQuery } from '@common';
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
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagDto } from './dto';
import { TagService } from './tag.service';

@Controller('/tag')
@ApiTags('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @Header('Cache-Control', 'none')
  @ApiQuery({ type: Number, name: 'id' })
  get(@Query('id') id: number) {
    return this.tagService.findById({ ids: [id] });
  }
  @Post('')
  @Header('Cache-Control', 'none')
  @ApiBody({ type: TagDto })
  create(@Body() tag: TagDto) {
    return this.tagService.create([tag]);
  }

  @Put('/:id')
  @Header('Cache-Control', 'none')
  @ApiBody({ type: TagDto })
  update(@Body() tag: TagDto) {
    return this.tagService.update(tag);
  }

  @Delete()
  @ApiQuery({ type: Number, name: 'id' })
  @ApiQuery({ type: Boolean, required: false, name: 'force' })
  delete(
    @Query('id') id: number,
    @BooleanQuery('force', false) force: boolean
  ) {
    if (force) {
      return this.tagService.delete([id]);
    }
    return this.tagService.softDelete([id]);
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
  @ApiResponse({})
  list(
    @PageQuery('page', DEFAULT_PAGE_QUERY.page) page: number,
    @PageQuery('pageSize', DEFAULT_PAGE_QUERY.pageSize)
    pageSize: number
  ) {
    // 返回索引列表
    return this.tagService.find({ page, pageSize });
  }
}
