import tableApi from './ApiTable';
import adapter from '../stat-json/StatJsonAdapter';

const StatSweden = {
  api: tableApi,
  optionFetch: tableApi.crOptionFetch,
  adapter
};

export default StatSweden
