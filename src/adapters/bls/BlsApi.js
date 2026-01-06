import {
  isArr,
  isNumber,
  parseIntBy10
} from '../../utils/isTypeFn';
import {
  crGetRoute
} from '../../utils/crRouter';

import {
  assign,
  getYear,
  getCurrentYear,
  crError
} from '../AdapterFn';

const API_URL = 'https://api.bls.gov/publicAPI'
, TS_DATA = 'timeseries/data'
, NATIVE_URL = 'https://data.bls.gov/timeseries';

const _fCrId321 = idPrefix => (
  items
) => `${idPrefix}${items[2].v}R${items[1].v}${items[0].v}`;

const _crSeriaIdRoutes = {
  CU: _fCrId321('CU'),
  CW: _fCrId321('CW')
}
, _crDfSeriaId = items => items[0].v
, _getCrSeriaId = crGetRoute(
  _crSeriaIdRoutes,
  _crDfSeriaId
);

const _getSeriaId = ({
  items=[],
  dfCode
}) => _getCrSeriaId(dfCode)(items);

const _addNativeLinkTo = (
  option,
  seriaId
) => {
  assign(option, {
    linkItem: {
      caption: 'U.S. BLS Data Link',
      href: `${NATIVE_URL}/${seriaId}`
    }
  })
};

const _crCaptionImpl = (
  title,
  subtitle
) => ({
  title,
  subtitle
})
, _crCaption321 = (
  dfTitle,
  items
) => _crCaptionImpl(
  `${dfTitle}, ${items[2].c}`,
  `${items[1].c}: ${items[0].c}`
)
, _routesCrCaption = {
  CU: _crCaption321,
  CW: _crCaption321
}
, _crDfCaption = (
  dfTitle,
  items,
  option
) => _crCaptionImpl(
  dfTitle || option.subtitle,
  option.title
)
, _getCrCaption = crGetRoute(
  _routesCrCaption,
  _crDfCaption
);

const _crCaption = (
  option
) => _getCrCaption(option.dfCode)(
  option.dfTitle,
  option.items,
  option
);

const _setCaptionTo = option => {
  const { title } = option;
  assign(option, {
    itemCaption: title,
    ..._crCaption(option)
  })
};

const _crQueryKey = ({ apiKey }) => apiKey
  ? `?registrationkey=${apiKey}`
  : ''

const _crQueryPeriod = (queryKey, {fromDate}) => {
  if (!queryKey) { return ''; }
  const _startyear = parseIntBy10(getYear(fromDate))
  , _endyear = parseIntBy10(getCurrentYear());
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
      return;
    }
    throw crError('', message[0]);
  }
};

export default BlsApi
