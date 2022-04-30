import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HistorySearchesModule } from './historySearches/historySearches.module';
import { PlacesModule } from './places/places.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, HistorySearchesModule, PlacesModule],
})
export class AppModule {}
