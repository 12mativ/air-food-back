import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/role/role.enum';
import { PageRequestDto } from 'src/pagination/dto/query-page-request.dto';
import { LimitRequestDto } from 'src/pagination/dto/query-limit-request.dto';
import { GetCoachesResponseDto } from './dto/get-coach-response.dto';

@ApiTags("Coach")
@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  findCoachForSearch(
    @Query('coachForSearch') coachForSearch: string,
    @Query('page') page: PageRequestDto,
    @Query('limit') limit: LimitRequestDto,
  ): Promise<GetCoachesResponseDto> {
    return this.coachService.findCoaches(coachForSearch, +page, +limit);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
    return this.coachService.update(id, updateCoachDto);
  }
}
