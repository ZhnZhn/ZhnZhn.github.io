import {
  _assign,
  crError,
  getValue
} from './fnAdapter';

const URL = 'https://api.db.nomics.world/v22/series'
, TAIL = 'observations=1&format=json&metadata=false'
, DF_ID = 'ECB/EXR/A.USD.EUR.SP00.A';

const _isArr = Array.isArray
, _crErr = crError.bind(null, '');

const _crUrlImpl = (
  dfProvider,
  dfCode,
  seriaId
) => (!dfProvider || !dfCode || !seriaId)
  ? `${URL}?series_ids=${DF_ID}&${TAIL}`
  : `${URL}?series_ids=${dfProvider}/${dfCode}/${seriaId}&${TAIL}`;

const _crUrl = (seriaId, option) => {
  const { dfProvider, dfCode } = option;
  option.seriaId = seriaId
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};

const _dfFnUrl = option => _isArr(option.items)
  ? _crUrl(getValue(option.items[0]), option)
  : _crUrl('', option);

const _crIdUrl = (option, dfProvider, dfCode, seriaId) => {
  _assign(option, {seriaId, dfProvider, dfCode})
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};

const _trimStr = (str='') => str.trim();
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

const _crSeriaId = ({ dfPrefix, dfSufix }, ...args) => [
  dfPrefix,
  ...args,
  dfSufix
].filter(Boolean)
 .join('.');

const _s1FnUrl = (option) => {
  const { items } = option
  , _seriaId = _crSeriaId(option,
    getValue(items[0])
  );
  return _crUrl(_seriaId, option);
};

const _s21FnUrl = (option) => {
  const { items, df1Prefix, df2Prefix } = option
  , _seriaId = _crSeriaId(option,
    df1Prefix,
    getValue(items[1]),
    df2Prefix,
    getValue(items[0])
  );
  return _crUrl(_seriaId, option);
};
const _s12FnUrl = (option) => {
  const { items, df1Prefix, df2Prefix } = option
  , _seriaId = _crSeriaId(option,
    df1Prefix,
    getValue(items[0]),
    df2Prefix,
    getValue(items[1])
  );
  return _crUrl(_seriaId, option);
};

const _s123BFnUrl = (option) => {
  const { items, df2Prefix } = option
  , _seriaId = _crSeriaId(option,
    getValue(items[0]),
    df2Prefix,
    getValue(items[1]),
    getValue(items[2])
  );
  return _crUrl(_seriaId, option);
};

const _s123FnUrl = (option) => {
  const { items } = option
  , _seriaId = _crSeriaId(option,
     getValue(items[0]),
     getValue(items[1]),
     getValue(items[2])
    );
  return _crUrl(_seriaId, option);
};

const _s3S12FnUrl = (option) => {
  const {
    items,
    dfCode,
    subtitle
  } = option
  , v1 = getValue(items[0])
  , v2 = getValue(items[1])
  , v3 = getValue(items[2])
  , _seriaId = _crSeriaId(option, v1, v2);
  _assign(option, {
    dfCode: `${dfCode}:${v3}`,
    subtitle: (subtitle || []).split(':')[0] || ''
  })
  return _crUrl(_seriaId, option);
}

const _rFnUrl = {
  DF: _dfFnUrl,
  id: _idFnUrl,
  s1: _s1FnUrl,
  s12: _s12FnUrl,
  s21: _s21FnUrl,
  s123B: _s123BFnUrl,
  s123: _s123FnUrl,
  s3S12: _s3S12FnUrl
};

const DbNomicsApi = {
  getRequestUrl(option){
    if (option.url) {
      return option.url;
    }
    const { dfFnUrl } = option
    , _crUrl = _rFnUrl[dfFnUrl] || _rFnUrl.DF;
    return (option.url = _crUrl(option));
  },

  checkResponse(json){
    if (json && _isArr(json.errors)) {
      throw _crErr(json.errors[0].message);
    }
    const docs = json && json.series && json.series.docs;
    if (!_isArr(docs) || !docs[0]
      || !_isArr(docs[0].period)
      || !_isArr(docs[0].value)) {
      throw _crErr();
    }
    return true;
  }
};

export default DbNomicsApi
