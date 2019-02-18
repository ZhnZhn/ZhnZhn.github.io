const C = {
  URL: 'https://api.db.nomics.world/v22/series',
  TAIL: 'observations=1&format=json',
  DF_ID: 'ECB/EXR/A.USD.EUR.SP00.A',
  ERR_CAPTION: 'Server Response',
  MSG_EMPTY: 'Dataset is empty'
};

const _crErr = message => ({
    errCaption: C.ERR_CAPTION,
    message: message || ''
});
const _getValue = obj => obj && obj.value
   ? obj.value
   : '';

const _crUrlImpl = (dfProvider, dfCode, seriaId) => {
 if (!dfProvider || !dfCode || !seriaId) {
   return `${C.URL}?series_ids=${C.DF_ID}${C.TAIL}`;
 }
 return `${C.URL}?series_ids=${dfProvider}/${dfCode}/${seriaId}&${C.TAIL}`;
};

const _crUrl = (seriaId, option) => {
  const { dfProvider, dfCode } = option;
  option.seriaId = seriaId
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};

const _dfFnUrl = option => _crUrl(option.value, option);

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

const _s21FnUrl = (option) => {
  const { dfSufix, items } = option
  , _one = _getValue(items[0])
  , _two = _getValue(items[1])
  , _seriaId = dfSufix
      ? `${_two}.${_one}.${dfSufix}`
      : `${_two}.${_one}`;
  return _crUrl(_seriaId, option);
};
const _s12FnUrl = (option) => {
  const { dfSufix, items } = option
  , _one = _getValue(items[0])
  , _two = _getValue(items[1])
  , _seriaId = dfSufix
      ? `${_one}.${_two}.${dfSufix}`
      : `${_one}.${_two}`;
  return _crUrl(_seriaId, option);
};
const _s123AFnUrl = (option) => {
  const { items, df3Prefix='' } = option
  , _one = _getValue(items[0])
  , _two = _getValue(items[1])
  , _three = _getValue(items[2])
  , _seriaId = `${_one}.${_two}.${df3Prefix}.${_three}`;
  return _crUrl(_seriaId, option);
};

const _rFnUrl = {
  DF: _dfFnUrl,
  id: _idFnUrl,
  s12: _s12FnUrl,
  s21: _s21FnUrl,
  s123A: _s123AFnUrl
};

const DbNomicsApi = {
  getRequestUrl(option){
    const { dfFnUrl } = option
    , _crUrl = _rFnUrl[dfFnUrl] || _rFnUrl.DF;
    return _crUrl(option);
  },

  checkResponse(json){
    if (json && Array.isArray(json.errors)) {
      throw _crErr(json.errors[0].message);
    }
    const docs = json && json.series && json.series.docs;
    if (!Array.isArray(docs) || !docs[0]
      || !Array.isArray(docs[0].period)
      || !Array.isArray(docs[0].value)) {
      throw _crErr(C.MSG_EMPTY);
    }
    return true;
  }
};

export default DbNomicsApi
