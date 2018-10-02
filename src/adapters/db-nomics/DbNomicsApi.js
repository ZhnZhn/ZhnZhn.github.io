const C = {
  URL: 'https://api.db.nomics.world/v21/series',
  TAIL: 'format=json&orientation=column',

  MSG_EMPTY: 'Dataset is empty',

  DF_PROVIDER: 'ECB',
  DF_CODE: 'EXR',
  DF_SERIA_ID: 'A.USD.EUR.SP00.A'
};

const _crErr = (caption, message) => ({
    errCaption: caption,
    message: message
});
const _getValue = (obj) => {
  return obj && obj.value
   ? obj.value
   : '';
};

const _crUrl = (seriaId, option) => {
  const { dfProvider, dfCode } = option;
  option.seriaId = seriaId
  return `${C.URL}?provider_code=${dfProvider}&dataset_code=${dfCode}&series_code=${seriaId}&${C.TAIL}`;
};

const _dfFnUrl = (option) => {
  const { value } = option
  , _seriaId = value;
  return _crUrl(_seriaId, option);
};

const _crIdUrl = (option, dfProvider, dfCode, seriaId) => {
  Object.assign(option, {
    seriaId: option.value,
    dfProvider, dfCode
  })
  return `${C.URL}?provider_code=${dfProvider}&dataset_code=${dfCode}&series_code=${seriaId}&${C.TAIL}`;
};
const _idFnUrl = (option) => {
  const { value } = option
  , arr = value.split('/');
  if (arr.length !== 3) {
    return _crIdUrl(option,
      C.DF_PROVIDER, C.DF_CODE, C.DF_SERIA_ID
    );
  }
  return _crIdUrl(option,
    arr[0], arr[1], arr[2]
  );
};

const _s21FnUrl = (option) => {
  const { dfSufix, items } = option
  , _one = _getValue(items[0])
  , _two = _getValue(items[1])
  , _seriaId = `${_two}.${_one}.${dfSufix}`;
  return _crUrl(_seriaId, option)
};
const _s12FnUrl = (option) => {
  const { dfSufix, items } = option
  , _one = _getValue(items[0])
  , _two = _getValue(items[1])
  , _seriaId = `${_one}.${_two}.${dfSufix}`;
  return _crUrl(_seriaId, option)
};

const _rFnUrl = {
  DF: _dfFnUrl,
  id: _idFnUrl,
  s12: _s12FnUrl,
  s21: _s21FnUrl,  
};

const DbNomicsApi = {
  getRequestUrl(option){
    const { dfFnUrl } = option
    , _crUrl = _rFnUrl[dfFnUrl] || _rFnUrl.DF;
    return _crUrl(option);
  },

  checkResponse(json){
    if (!json || !json.series
      || !Array.isArray(json.series.period)
      || !Array.isArray(json.series.value)) {
    throw _crErr('', C.MSG_EMPTY);
  }
    return true;
  }
};

export default DbNomicsApi
