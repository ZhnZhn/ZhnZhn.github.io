import tableApi from './ApiTable'
import adapter from '../stat-norway/StatNorwayAdapter'

const StatFinland = {
  api: tableApi,
  optionFetch: tableApi.crOptionFetch,
  adapter
};

export default StatFinland
