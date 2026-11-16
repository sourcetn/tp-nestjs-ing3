import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';

@Injectable()
export class TravelService {
  private travels: Travel[] = [
    {
      id: 1,
      destination: 'Djerba',
      country: 'Tunisie',
      price: 450,
      durationDays: 5,
      departureDate: '2026-12-15',
    },
  ];

  create(createTravelDto: CreateTravelDto): Travel {
    const newTravel: Travel = {
      id: Date.now(),
      ...createTravelDto,
    };
    this.travels.push(newTravel);
    return newTravel;
  }

  findAll(): Travel[] {
    return this.travels;
  }

  findOne(id: number): Travel {
    const travel = this.travels.find((t) => t.id === id);
    if (!travel) {
      throw new NotFoundException(`Voyage avec l'ID #${id} introuvable`);
    }
    return travel;
  }

  update(id: number, updateTravelDto: UpdateTravelDto): Travel {
    const travel = this.findOne(id);
    Object.assign(travel, updateTravelDto);
    return travel;
  }

  remove(id: number): void {
    const index = this.travels.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Voyage avec l'ID #${id} introuvable`);
    }
    this.travels.splice(index, 1);
  }
}