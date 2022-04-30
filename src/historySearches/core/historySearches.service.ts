import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { HistorySearch } from './historySearches.entity';
import { HistorySearchesRepository } from './historySearches.repository';

@Injectable()
export class HistorySearchesService {
  constructor(
    @Inject('HistorySearchesRepository')
    private userRepository: HistorySearchesRepository,
  ) {}

  async create(historySearch: HistorySearch): Promise<HistorySearch> {
    return this.userRepository.create(historySearch);
  }

  findAll(): Promise<HistorySearch[]> {
    return this.userRepository.findAll();
  }

  remove(uuid: UUID): Promise<HistorySearch> {
    return this.userRepository.remove(uuid);
  }
}
