import { Place } from 'src/places/core/place.entity';

type PlaceResponse = {
  name: string;
};

const mapToResponse = (place: Place): PlaceResponse => {
  return {
    name: place.getName(),
  };
};

export { PlaceResponse, mapToResponse };
