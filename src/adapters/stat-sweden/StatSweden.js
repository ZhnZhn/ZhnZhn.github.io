import tableApi from './ApiTable'
import adapter from '../stat-norway/StatNorwayAdapter'

const StatSweden = {
  Table: {
    api: tableApi,
    optionFetch: tableApi.crOptionFetch,
    adapter
  }
};

export default StatSweden
