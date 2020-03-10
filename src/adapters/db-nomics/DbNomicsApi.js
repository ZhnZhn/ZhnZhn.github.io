import fnAdapter from './fnAdapter'

const { crError } = fnAdapter;

const C = {
  URL: 'https://api.db.nomics.world/v22/series',
  TAIL: 'observations=1&format=json&metadata=false',
  DF_ID: 'ECB/EXR/A.USD.EUR.SP00.A',
  ERR_CAPTION: 'Server Response',
  MSG_EMPTY: 'Dataset is empty'
};

const _isArr = Array.isArray;
const _crErr = crError.bind(null, C.ERR_CAPTION);

const _getValue = obj => obj && obj.value
   ? obj.value
   : '';

const _crUrlImpl = (dfProvider, dfCode, seriaId) => {
 if (!dfProvider || !dfCode || !seriaId) {
   return `${C.URL}?series_ids=${C.DF_ID}&${C.TAIL}`;
 }
 return `${C.URL}?series_ids=${dfProvider}/${dfCode}/${seriaId}&${C.TAIL}`;
};

const _crUrl = (seriaId, option) => {
  const { dfProvider, dfCode } = option;
  option.seriaId = seriaId
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};

const _dfFnUrl = option => _isArr(option.items)
  ? _crUrl(_getValue(option.items[0]), option)
  : _crUrl('', option);

const _crIdUrl = (option, dfProvider, dfCode, seriaId) => {
  Object.assign(option, {
    seriaId: option.value,
    dfProvider, dfCode
  })
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};
const _idFnUrl = (option) => {
  const { value } = option || ''
  , arr = value.split('/');
  return _crIdUrl(option, arr[0], arr[1], arr[2]);
};

const _crSeriaId = ({ dfPrefix, dfSufix }, ...args) => [
    dfPrefix, ...args, dfSufix
  ].filter(Boolean)
   .join('.');

const _s1FnUrl = (option) => {
  const { items } = option
  , _seriaId = _crSeriaId(option,
    _getValue(items[0]),
  );
  return _crUrl(_seriaId, option);
};

const _s21FnUrl = (option) => {
  const { items, df1Prefix, df2Prefix } = option
  , _seriaId = _crSeriaId(option,
    df1Prefix,
    _getValue(items[1]),
    df2Prefix,
    _getValue(items[0]),
  );
  return _crUrl(_seriaId, option);
};
const _s12FnUrl = (option) => {
  const { items, df1Prefix, df2Prefix } = option
  , _seriaId = _crSeriaId(option,
    df1Prefix,
    _getValue(items[0]),
    df2Prefix,
    _getValue(items[1]),
  );
  return _crUrl(_seriaId, option);
};
const _s123AFnUrl = (option) => {
  const { items, df3Prefix } = option
  , _seriaId = _crSeriaId(option,
    _getValue(items[0]),
    _getValue(items[1]),
    df3Prefix,
    _getValue(items[2])
  );
  return _crUrl(_seriaId, option);
};
const _s123BFnUrl = (option) => {
  const { items, df2Prefix } = option
  , _seriaId = _crSeriaId(option,
    _getValue(items[0]),
    df2Prefix,
    _getValue(items[1]),
    _getValue(items[2])
  );
  return _crUrl(_seriaId, option);
};

const _s123FnUrl = (option) => {
  const { items } = option
  , _seriaId = _crSeriaId(option,
    _getValue(items[0]),
    _getValue(items[1]),
    _getValue(items[2])
    )
    return _crUrl(_seriaId, option);
};

const _rFnUrl = {
  DF: _dfFnUrl,
  id: _idFnUrl,
  s1: _s1FnUrl,
  s12: _s12FnUrl,
  s21: _s21FnUrl,
  s123A: _s123AFnUrl,
  s123B: _s123BFnUrl,
  s123: _s123FnUrl
};

const DbNomicsApi = {
  getRequestUrl(option){
    const { dfFnUrl } = option
    , _crUrl = _rFnUrl[dfFnUrl] || _rFnUrl.DF;
    return _crUrl(option);
  },

  checkResponse(json){
    if (json && _isArr(json.errors)) {
      throw _crErr(json.errors[0].message);
    }
    const docs = json && json.series && json.series.docs;
    if (!_isArr(docs) || !docs[0]
      || !_isArr(docs[0].period)
      || !_isArr(docs[0].value)) {
      throw _crErr(C.MSG_EMPTY);
    }
    return true;
  }
};

export default DbNomicsApi
