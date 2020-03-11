import tableApi from './ApiTable'
import adapter from '../stat-norway/StatNorwayAdapter'

const StatSweden = {
  api: tableApi,
  optionFetch: tableApi.crOptionFetch,
  adapter
};

export default StatSweden
