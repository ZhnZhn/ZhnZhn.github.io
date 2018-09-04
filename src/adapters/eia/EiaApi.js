const C = {
  URL: "https://api.eia.gov/category/",
  S_URL: "https://api.eia.gov/series/"
};
const CAPTION = 'EIA';
const MSG = {
  ERR: 'invalid series_id.',
  NOT_EXIST: 'Data for enetered parameters is not existed.',
  EMPTY: 'Response is empty.',
  DATA_EMPTY: 'Data is empty.'
};

const _crErr = (caption, message) => ({
    errCaption: caption,
    message: message
})

const EiaApi = {
  getRequestUrl(option){
    const {
      //cId,
      sufix,
      apiKey,
      items=[]
    } = option
    , _one = items[0] ? items[0].value : ''
    , _two = items[1] ? items[1].value : ''
    , _three = items[2] ? items[2].value : ''
    , _sufix = _three || sufix;

    return `${C.S_URL}?api_key=${apiKey}&series_id=${_two}${_one}${_sufix}`;
  },

  checkResponse(json){
    if (!json) {
      throw _crErr(CAPTION, MSG.EMPTY);
    }
    const { data={} } = json
    , { error:msgErr } = data;
    if (msgErr) {
      if (msgErr.indexOf(MSG.ERR) !== -1) {
        throw _crErr(CAPTION, MSG.NOT_EXIST);
      }
      throw _crErr(CAPTION, msgErr);
    }
    if (!json.series || !json.series[0]) {
      throw _crErr(CAPTION, MSG.DATA_EMPTY);
    }
    return true;
  }
};

export default EiaApi
