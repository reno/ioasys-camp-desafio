import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from '@modules/location/location.service';
import { ApiTags } from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';

@ApiTags('Locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async findAll() {
    const states = await this.locationService.findAll();
    return states.map(state => instanceToInstance(state));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const state = await this.locationService.findOne(id);
    return instanceToInstance(state);
  }
}
