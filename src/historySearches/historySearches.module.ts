import { Module } from '@nestjs/common';
import { PrismaService } from 'src/commons/infraestructure/db/prisma/prisma.service';
import { HistorySearchesService } from './core/historySearches.service';
import { HistorySearchesDBRepository } from './infraestructure/historySearchesDBRepostory';
import { HistorySearchesController } from './presentation/historySearches.controller';

@Module({
  controllers: [HistorySearchesController],
  providers: [
    {
      provide: 'HistorySearchesRepository',
      useClass: HistorySearchesDBRepository,
    },
    HistorySearchesService,
    PrismaService,
  ],
  exports: [HistorySearchesService],
})
export class HistorySearchesModule {}
