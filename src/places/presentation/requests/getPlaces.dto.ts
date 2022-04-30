import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class getPlacesDto {
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  lat: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  lng: number;
}
