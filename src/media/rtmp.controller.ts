import { Controller, Delete, Get, Header, Put, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RtmpService } from './rtmp.service';

@Controller('/rtmp')
@ApiTags('rtmp')
export class RtmpController {
  constructor(private readonly rtmpService: RtmpService) {}

  @Get('/pull')
  @Header('Cache-Control', 'none')
  @ApiQuery({ type: String, name: 'resource' })
  pull(@Query('resource') resource) {
    return null;
  }

  @Put('/push')
  @Header('Cache-Control', 'none')
  @ApiQuery({ type: String, name: 'resource' })
  pushToMeiaServer(@Query('resource') resource) {
    return this.rtmpService.push();
  }

  @Delete('/stop')
  @Header('Cache-Control', 'none')
  @ApiParam({ type: String, name: 'resource' })
  stopPushToMeiaServer(@Query('resource') resource) {
    return this.rtmpService.stop();
  }
}
