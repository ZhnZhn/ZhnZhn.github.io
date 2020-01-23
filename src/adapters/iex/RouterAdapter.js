
import Scatter from './TemplateScatter'
import Tokens from './TemplateTokens'
import toCompany from './toCompanyImpl'
import toStats from './toStatsImpl'
import toEarnings from './toEarningsImpl'
import toDividends from './toDividendsImpl'
import toChart from './toChart'
import toTable from './toTable'
import CT from './ChartType'

const _r = {
  DF: toChart,
  [CT.ERN]: Scatter(toEarnings),
  [CT.DIV]: Scatter(toDividends),
  [CT.CHART]: toChart,
  [CT.COM]: Tokens(toCompany),
  [CT.STA]: Tokens(toStats),
  [CT.ML]: toTable
};

const RouterAdapter = {
  getAdapter(option){
    const { dfType } = option;
    return _r[dfType] || _r.DF;
  }
};

export default RouterAdapter
