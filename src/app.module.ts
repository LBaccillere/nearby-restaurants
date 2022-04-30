import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HistorySearchesModule } from './historySearches/historySearches.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, HistorySearchesModule],
})
export class AppModule {}
