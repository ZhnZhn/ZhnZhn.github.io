import {
  isArr,
  isNumber,
  getYear,
  getCurrentYear,
  crError
} from '../AdapterFn';
import {
  crHm
} from '../crFn';

const API_URL = 'https://api.bls.gov/publicAPI'
, TS_DATA = 'timeseries/data'
, NATIVE_URL = 'https://data.bls.gov/timeseries';

const _assign = Object.assign;

const _fCrId321 = idPrefix => (
  items
) => `${idPrefix}${items[2].v}R${items[1].v}${items[0].v}`;

const _hmCrId = crHm({
  CU: _fCrId321('CU'),
  CW: _fCrId321('CW')
});

const _getSeriaId = ({
  items=[],
  dfCode
}) => {
  const _crId = _hmCrId[dfCode];
  return _crId
    ? _crId(items)
    : items[0].v;
};

const _addNativeLinkTo = (
  option,
  seriaId
) => {
  _assign(option, {
    linkItem: {
      caption: 'U.S. BLS Data Link',
      href: `${NATIVE_URL}/${seriaId}`
    }
  })
};


const _crCaption321 = (
  dfTitle,
  items
) => ({
  title: `${dfTitle}, ${items[2].c}`,
  subtitle: `${items[1].c}: ${items[0].c}`
});

const _hmCrCaption = crHm({
  CU: _crCaption321,
  CW: _crCaption321
});

const _crCaption = ({
  dfCode,
  dfTitle,
  title,
  subtitle,
  items
}) => {
  const _crC = _hmCrCaption[dfCode];
  return _crC
    ? _crC(dfTitle, items)
    : {
      title: dfTitle || subtitle,
      subtitle: title
    };
};

const _setCaptionTo = option => {
  const { title } = option;
  _assign(option, {
    itemCaption: title,
    ..._crCaption(option)
  })
};

const _crQueryKey = ({ apiKey }) => apiKey
  ? `?registrationkey=${apiKey}`
  : ''

const _crQueryPeriod = (queryKey, {fromDate}) => {
  if (!queryKey) { return ''; }
  const _startyear = parseInt(getYear(fromDate), 10)
  , _endyear = parseInt(getCurrentYear(), 10);
  if (isNumber(_startyear) && isNumber(_endyear)
      && _endyear - _startyear < 21) {
    return `&startyear=${_startyear}&endyear=${_endyear}`;
  }
  return '';
};

const BlsApi = {

  getRequestUrl(option){
    const seriaId = _getSeriaId(option)
    , _queryKey = _crQueryKey(option)
    , _v = _queryKey ? 'v2' : 'v1'
    , _queryPeriod = _crQueryPeriod(_queryKey, option);
    _addNativeLinkTo(option, seriaId)
    _setCaptionTo(option)
    return `${API_URL}/${_v}/${TS_DATA}/${seriaId}${_queryKey}${_queryPeriod}`;
  },

  checkResponse(json){
    const { Results, message=[] } = json || {}
    , { series } = Results || {}
    , _s = (series || [])[0];
    if (_s && isArr(_s.data)){
      return json;
    }
    throw crError('', message[0]);
  }
}

export default BlsApi
