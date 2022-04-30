import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PlacesService } from './core/places.service';
import { PlaceController } from './presentation/places.controller';

@Module({
  imports: [HttpModule],
  controllers: [PlaceController],
  providers: [PlacesService],
  exports: [PlacesService],
})
export class PlacesModule {}
