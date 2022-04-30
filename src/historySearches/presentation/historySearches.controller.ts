import { Controller, Get, UseGuards } from '@nestjs/common';
import { HistorySearchesService } from 'src/historySearches/core/historySearches.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import {
  HistorySearchesResponse,
  mapToResponse as mapToPaginatedResponse,
} from './responses/historySearches.response';

@Controller('history-searches')
export class HistorySearchesController {
  constructor(
    private readonly historySearchesService: HistorySearchesService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<HistorySearchesResponse> {
    return mapToPaginatedResponse(await this.historySearchesService.findAll());
  }
}
