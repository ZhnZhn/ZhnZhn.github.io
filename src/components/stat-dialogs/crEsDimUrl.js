
const ES_BASE_META = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en";

const _crMetaTime = mapFrequency => {
  if (mapFrequency === 'M') { return '2019M01'; }
  if (mapFrequency === 'S') { return '2019S1'; }
  if (mapFrequency === 'Q') { return '2019Q1'; }
  return '2019';
};

const crEsDimUrl = ({
  dfNonTime,
  mapFrequency,
  dfId
}) => {
  const _queryTail = dfNonTime
    ? ''
    : `?time=${_crMetaTime(mapFrequency)}`;
  return `${ES_BASE_META}/${dfId}${_queryTail}`;
};

export default crEsDimUrl
