
import toEarnings from './toEarnings'
import toChart from './toChart'

const _r = {
  DF: toChart,
  earnings: toEarnings,
  chart: toChart
};

const RouterAdapter = {
  getAdapter(option){
    const { dfType } = option;
    return _r[dfType] || _r.DF;
  }
}

export default RouterAdapter
