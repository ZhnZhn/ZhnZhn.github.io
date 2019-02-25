import tableApi from './ApiTable'
import adapter from '../stat-norway/StatNorwayAdapter'

const StatFinland = {
  Table: {
    api: tableApi,
    optionFetch: tableApi.crOptionFetch,
    adapter
  }
};

export default StatFinland
