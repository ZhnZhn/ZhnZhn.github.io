
import Scatter from './Scatter'
import toEarnings from './toEarningsImpl'
import toDividends from './toDividendsImpl'
import toChart from './toChart'
import CT from './ChartType'


const _r = {
  DF: toChart,
  [CT.ERN]: Scatter(toEarnings),
  [CT.DIV]: Scatter(toDividends),
  [CT.CHART]: toChart
};

const RouterAdapter = {
  getAdapter(option){
    const { dfType } = option;
    return _r[dfType] || _r.DF;
  }
};

export default RouterAdapter
