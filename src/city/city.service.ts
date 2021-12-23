import { Injectable } from '@nestjs/common';
import { City } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class CityService {
  constructor(
    private readonly prisma: PrismaService,
  ) {

  }

  public async getCityById(id: number): Promise<City | null> {
    return this.prisma.city.findUnique({
      where: { id },
    });
  }

  public async getAllCities(): Promise<City[]> {
    return this.prisma.city.findMany();
  }
}
