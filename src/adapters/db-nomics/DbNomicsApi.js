const C = {
  URL: 'https://api.db.nomics.world/v21/series',
  TAIL: 'format=json&orientation=column',

  MSG_EMPTY: 'Dataset is empty'
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


const _s21FnUrl = (option) => {
  const { dfSufix, items } = option
  , _one = _getValue(items[0])
  , _two = _getValue(items[1])
  , _seriaId = `${_two}.${_one}.${dfSufix}`;
  return _crUrl(_seriaId, option)
};

const _rFnUrl = {
  DF: _dfFnUrl,
  s21: _s21FnUrl
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
