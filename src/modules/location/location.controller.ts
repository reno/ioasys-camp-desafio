import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from '@modules/location/location.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';
import { State } from '@shared/entities/location/state.entity';

@ApiTags('Locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  @ApiOkResponse({ type: State, isArray: true })
  async findAll() {
    const states = await this.locationService.findAll();
    return states.map(state => instanceToInstance(state));
  }

  @Get(':id')
  @ApiOkResponse({ type: State })
  async findOne(@Param('id') id: string) {
    const state = await this.locationService.findOne(id);
    return instanceToInstance(state);
  }
}
