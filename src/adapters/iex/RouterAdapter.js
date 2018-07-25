
import Scatter from './Scatter'
import toEarnings from './toEarningsImpl'
import toDividends from './toDividendsImpl'
import toChart from './toChart'

const _r = {
  DF: toChart,
  earnings: Scatter(toEarnings),
  dividends: Scatter(toDividends),
  chart: toChart
};

const RouterAdapter = {
  getAdapter(option){
    const { dfType } = option;
    return _r[dfType] || _r.DF;
  }
};

export default RouterAdapter
