import { Place } from 'src/places/core/place.entity';
import {
  PlaceResponse,
  mapToResponse as mapToPlaceResponse,
} from './place.response';

type PlacesResponse = {
  places: PlaceResponse[];
};

const mapToResponse = (places: Place[]): PlacesResponse => {
  return {
    places: places.map((i) => mapToPlaceResponse(i)),
  };
};

export { PlacesResponse, mapToResponse };
