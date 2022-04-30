import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PlacesService } from '../core/places.service';
import { mapToResponse, PlacesResponse } from './responses/places.response';

@Controller('places')
export class PlaceController {
  constructor(private readonly placesService: PlacesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findNearbyPlaces(): Promise<PlacesResponse> {
    return mapToResponse(await this.placesService.findNearbyPlaces());
  }
}
