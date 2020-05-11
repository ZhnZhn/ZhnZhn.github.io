
import Scatter from './TemplateScatter'
import Tokens from './TemplateTokens'
import toCompany from './toCompanyImpl'
import toStats from './toStatsImpl'
import toEarnings from './toEarningsImpl'
import toDividends from './toDividendsImpl'
import toChart from './toChart'
import toTable from './toTable'
import IT from './ItemTypes'

const _r = {
  DF: toChart,
  [IT.ERN]: Scatter(toEarnings),
  [IT.DIV]: Scatter(toDividends),
  [IT.CHART]: toChart,
  [IT.COM]: Tokens(toCompany),
  [IT.STA]: Tokens(toStats),
  [IT.ML]: toTable
};

const RouterAdapter = {
  getAdapter(option){
    const { dfType } = option;
    return _r[dfType] || _r.DF;
  }
};

export default RouterAdapter
