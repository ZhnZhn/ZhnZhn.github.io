import fTableApi from '../stat-json/fTableApi';
import adapter from './StatJsonAdapter';

const fStatJsonAdapter = url => {
  const tableApi = fTableApi(url);
  return {
    api: tableApi,
    optionFetch: tableApi.crOptionFetch,
    adapter
  };
};

export default fStatJsonAdapter
