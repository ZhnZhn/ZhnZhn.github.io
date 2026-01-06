import {
  isArr
} from '../../utils/isTypeFn';
import {
  joinBy,
  joinByDot
} from '../../utils/arrFn';
import {
  getValue
} from '../../utils/itemFn';

import {
  assign,
  crErrorByMessage,
  getDocs,
} from './fnAdapter';

const URL = 'https://api.db.nomics.world/v22/series'
, TAIL = 'observations=1&format=json&metadata=false'
, DF_ID = 'ECB/EXR/A.USD.EUR.SP00.A';

const _crUrlImpl = (
  dfProvider,
  dfCode,
  seriaId
) => {
  const _seriesId = dfProvider && seriaId
    ? joinBy('/', dfProvider, dfCode, seriaId)
    : `${DF_ID}`
  return `${URL}?series_ids=${_seriesId}&${TAIL}`;
}

const _crUrl = (
  seriaId,
  option
) => {
  const {
    dfProvider,
    dfCode
  } = option;
  option.seriaId = seriaId
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};

const _dfFnUrl = (
  option
) => isArr(option.items)
  ? _crUrl(getValue(option.items[0]), option)
  : _crUrl('', option);

const _crIdUrl = (
  option,
  dfProvider,
  dfCode,
  seriaId
) => {
  assign(option, {seriaId, dfProvider, dfCode})
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};

const _trimStr = str => (str||'').trim();
const _idFnUrl = (option) => {
  const { items } = option
  , value = getValue(items[0])
  , arr = value.split('/');
  return _crIdUrl(option,
    _trimStr(arr[0]),
    _trimStr(arr[1]),
    _trimStr(arr[2])
  );
};

const _crSeriaId = ({
  dfPrefix,
  dfSufix
}, values) => joinByDot(
  dfPrefix,
  ...values,
  dfSufix
);

const _fCrUrl = (
  crValues
) => option => _crUrl(
  _crSeriaId(option, crValues(option)),
  option
);

const _crValuesS1 = ({
  items
}) => [
  getValue(items[0])
]
, _s1FnUrl = _fCrUrl(_crValuesS1)

, _crValuesS21 = ({
  items,
  df1Prefix,
  df2Prefix
}) => [
  df1Prefix,
  getValue(items[1]),
  df2Prefix,
  getValue(items[0])
]
, _s21FnUrl = _fCrUrl(_crValuesS21)

, _crValuesS12 = ({
  items,
  df1Prefix,
  df2Prefix
}) => [
  df1Prefix,
  getValue(items[0]),
  df2Prefix,
  getValue(items[1])
]
, _s12FnUrl = _fCrUrl(_crValuesS12)

, _crValuesS123B = ({
  items,
  df2Prefix
}) => [
  getValue(items[0]),
  df2Prefix,
  getValue(items[1]),
  getValue(items[2])
]
, _s123BFnUrl = _fCrUrl(_crValuesS123B)

, _crValuesS123 = ({ items }) => _crValuesS123B({ items })
, _s123FnUrl = _fCrUrl(_crValuesS123)

, _crValuesS231 = ({ items }) => [
  getValue(items[2]),
  getValue(items[0]),
  getValue(items[1])
]
, _s231FnUrl = _fCrUrl(_crValuesS231);

const _crValues3S12 = ({ items }) => _crValuesS12({ items })
, _s3S12FnUrl = (option) => {
  const {
    items,
    dfCode,
    subtitle
  } = option;
  assign(option, {
    dfCode: `${dfCode}:${getValue(items[2])}`,
    subtitle: (subtitle || "").split(':')[0] || ''
  })
  return _fCrUrl(_crValues3S12)(option);
};

const _rFnUrl = {
  DF: _dfFnUrl,
  id: _idFnUrl,
  s1: _s1FnUrl,
  s12: _s12FnUrl,
  s21: _s21FnUrl,
  s123B: _s123BFnUrl,
  s123: _s123FnUrl,
  s231: _s231FnUrl,
  s3S12: _s3S12FnUrl
};

const DbNomicsApi = {
  getRequestUrl(option){
    if (option.url) {
      return option.url;
    }

    const {
      dfFnUrl
    } = option
    , _crUrl = (dfFnUrl && _rFnUrl[dfFnUrl])
      || _rFnUrl.DF;
    return (option.url = _crUrl(option));
  },

  checkResponse(json){
    const { errors } = json || {};
    if (isArr(errors)) {
      throw crErrorByMessage((errors[0] || {}).message);
    }

    const docs = getDocs(json)
    , _ts = isArr(docs) ? docs[0] : '';
    if (!_ts
      || !isArr(_ts.period)
      || !isArr(_ts.value)) {
      throw crErrorByMessage();
    }
  }
};

export default DbNomicsApi
