import { UUID } from 'src/commons/types/uuid';
import { HistorySearch } from './historySearches.entity';

export interface HistorySearchesRepository {
  create: (user: HistorySearch) => Promise<HistorySearch>;
  findAll: () => Promise<HistorySearch[]>;
  remove: (uuid: UUID) => Promise<HistorySearch>;
}
