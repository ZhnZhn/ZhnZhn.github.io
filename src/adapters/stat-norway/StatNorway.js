
import api from './ApiDataset'
import tableApi from './ApiTable'
import adapter from './StatNorwayAdapter'

const StatNorway = {
  Dataset: { api, adapter },
  Table: {
    api: tableApi,
    optionFetch: tableApi.crOptionFetch,
    adapter
  }
};

export default StatNorway
