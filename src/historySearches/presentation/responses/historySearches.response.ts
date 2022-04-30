import { HistorySearch } from 'src/historySearches/core/historySearches.entity';
import {
  HistorySearchResponse,
  mapToResponse as mapToHistorySearchResponse,
} from './historySearch.response';

type HistorySearchesResponse = {
  historySearches: HistorySearchResponse[];
};

const mapToResponse = (
  historySearches: HistorySearch[],
): HistorySearchesResponse => {
  return {
    historySearches: historySearches.map((i) => mapToHistorySearchResponse(i)),
  };
};

export { HistorySearchesResponse, mapToResponse };
