import fTableApi from '../stat-json/fTableApi';
import adapter from './StatJsonAdapter';

const fStatJsonAdapter = (
  rootUrl,
  crUrlPath
) => {
  const tableApi = fTableApi(
    rootUrl,
    crUrlPath
  );
  return {
    api: tableApi,
    optionFetch: tableApi.crOptionFetch,
    adapter
  };
};

export default fStatJsonAdapter
