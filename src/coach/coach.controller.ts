import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LimitRequestDto } from '../pagination/dto/query-limit-request.dto';
import { PageRequestDto } from '../pagination/dto/query-page-request.dto';
import { Role } from '..//role/role.enum';
import { Roles } from '../roles/roles.decorator';
import { CoachService } from './coach.service';
import { ReqUpdateCoachDto } from './dto/req-update-coach.dto';
import { ResGetCoachesDto } from './dto/res-get-coaches.dto';
import { ResGetCoachDto } from './dto/res-get-coach.dto';

@ApiTags('Coach')
@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: ResGetCoachesDto })
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  findCoachForSearch(
    @Query('coachForSearch') coachForSearch: string,
    @Query('page') page: PageRequestDto,
    @Query('limit') limit: LimitRequestDto,
  ): Promise<ResGetCoachesDto> {
    return this.coachService.findCoaches(coachForSearch, +page, +limit);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResGetCoachDto })
  update(@Param('id') id: string, @Body() updateCoachDto: ReqUpdateCoachDto) {
    return this.coachService.update(id, updateCoachDto);
  }
}
