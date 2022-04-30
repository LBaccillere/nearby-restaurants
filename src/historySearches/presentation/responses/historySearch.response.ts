import { HistorySearch } from 'src/historySearches/core/historySearches.entity';

type HistorySearchResponse = {
  query: string;
};

const mapToResponse = (historySearch: HistorySearch): HistorySearchResponse => {
  return {
    query: historySearch.getQuery(),
  };
};

export { HistorySearchResponse, mapToResponse };
