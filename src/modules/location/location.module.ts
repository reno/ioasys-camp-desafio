import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityRepository } from './repository/city.repository';
import { StateRepository } from './repository/state.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityRepository, StateRepository]),
  ],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
