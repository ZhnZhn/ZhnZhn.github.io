import { STAT_API_URL } from '../../../adapters/eurostat/api/apiFn';

const _crMetaTime = mapFrequency => {
  if (mapFrequency === 'M') { return '2019-01'; }
  if (mapFrequency === 'S') { return '2019-S1'; }
  if (mapFrequency === 'Q') { return '2019-Q1'; }
  return '2019';
};

const crDimUrlEs = ({
  dfNonTime,
  mapFrequency,
  dfId
}, queryTail) => {
  const _queryTail = [queryTail, (dfNonTime
    ? ''
    : `time=${_crMetaTime(mapFrequency)}`)
  ].filter(Boolean).join('&')
  , _qT = _queryTail ? '?' + _queryTail : '';

  return `${STAT_API_URL}/${dfId}${_qT}`;
};

export default crDimUrlEs
