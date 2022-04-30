import { Injectable } from '@nestjs/common';
import { Place } from './place.entity';

@Injectable()
export class PlacesService {
  findNearbyPlaces(): Promise<Place[]> {
    return Promise.resolve([]);
  }
}
