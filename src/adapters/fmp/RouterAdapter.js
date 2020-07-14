import toChart from './toChart'
import toHistorical from './toHistorical'

const _rAdapter = {
  DF: toChart,
  historical: toHistorical
};

const RouterAdapter = {
  getAdapter: ({ dfPn }) => _rAdapter[dfPn]
    || _rAdapter.DF
};

export default RouterAdapter
