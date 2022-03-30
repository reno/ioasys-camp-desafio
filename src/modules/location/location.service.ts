import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateRepository } from './repository/state.repository';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(StateRepository)
    private readonly stateRepository: StateRepository,
) {}

async findAll() {
    return await this.stateRepository.find();
  }

async findOne(id: string) {
    return await this.stateRepository.findOne(id, { relations: ['cities'] });
  }
}
