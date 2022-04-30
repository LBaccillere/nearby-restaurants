import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Place } from './place.entity';
import { Client } from '@googlemaps/google-maps-services-js';
import { getPlacesDto } from '../presentation/requests/getPlaces.dto';

@Injectable()
export class PlacesService {
  async findNearbyPlaces(params: getPlacesDto): Promise<Place[]> {
    try {
      // TODO guardar la busqueda en la base de datos
      const client = new Client({});
      const response = await client.placesNearby({
        params: {
          location: { lat: params.lat, lng: params.lng },
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      });
      if (!response || response.data || response.data.results.length === 0) {
        throw new HttpException('No data', HttpStatus.NOT_FOUND);
      }
      return this.matToPlaces(response.data.results);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  matToPlaces(records: any): Place[] {
    return records.map((r) => new Place(r.name));
  }
}
