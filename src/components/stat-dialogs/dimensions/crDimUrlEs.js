import { STAT_API_URL } from '../../../adapters/eurostat/api/apiFn';
import { filterBoolean } from '../../../utils/arrFn';

const _crMetaTime = (
  mapFrequency
) => mapFrequency === 'M'
  ? '2019-01'
  : mapFrequency === 'S'
  ? '2019-S1'
  : mapFrequency === 'Q'
  ? '2019-Q1'
  : '2019';

const crDimUrlEs = ({
  dfNonTime,
  mapFrequency,
  dfId
}, queryTail) => {
  const _queryTail = filterBoolean([queryTail, (dfNonTime
    ? ''
    : `time=${_crMetaTime(mapFrequency)}`)
  ]).join('&')
  , _qT = _queryTail ? '?' + _queryTail : '';

  return `${STAT_API_URL}/${dfId}${_qT}`;
};

export default crDimUrlEs
