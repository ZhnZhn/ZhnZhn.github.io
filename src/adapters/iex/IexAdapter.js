import { crAdapterRouter } from '../crAdapterRouter'

import Scatter from './TemplateScatter'
import Tokens from './TemplateTokens'
import toCompany from './toCompanyImpl'
import toStats from './toStatsImpl'
import toDividends from './toDividendsImpl'
import toChart from './toChart'
import toTable from './toTable'
import IT from './ItemTypes'

const IexAdapter = crAdapterRouter({
  rAdapter: {
    _pn: 'dfType',
    DF: toChart,
    [IT.DIV]: Scatter(toDividends),
    [IT.CHART]: toChart,
    [IT.COM]: Tokens(toCompany),
    [IT.STA]: Tokens(toStats),
    [IT.ML]: toTable
  },
  crDfKey: ({ _itemKey, one='', two='' }) => _itemKey
   || one + '_' + two
});

export default IexAdapter
