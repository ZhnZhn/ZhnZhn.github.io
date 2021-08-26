import tableApi from './ApiTable';
import adapter from '../stat-json/StatJsonAdapter';

const StatFinland = {
  api: tableApi,
  optionFetch: tableApi.crOptionFetch,
  adapter
};

export default StatFinland
