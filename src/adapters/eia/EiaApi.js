import { crError } from '../AdapterFn';

const S_URL = "https://api.eia.gov/series/";

const MSG_ERR = 'invalid series_id.'
, MSG_ERR_NOT_EXIST = 'Data for enetered parameters is not existed.';

const _getValue = (
  obj
) => obj && obj.value || '';

const _crSeriaDf = (option) => {
  const {
    sufix,
    items=[]
  } = option
  , _one = _getValue(items[0])
  , _two = _getValue(items[1])
  , _three = _getValue(items[2])
  , _sufix = _three || sufix || '';

  return `${_two}${_one}${_sufix}`;
};
const _crSeriaPI2 = (option) => {
  const {
    prefix,
    items=[]
  } = option
  , _one = _getValue(items[0])
  , _two = _getValue(items[1]);
  return `${prefix}${_one}${_two}`;
};
const _crSeriaPI321S = (option) => {
  const {
    prefix,
    items=[],
    sufix
  } = option
  , _one = _getValue(items[0])
  , _two = _getValue(items[1])
  , _three = _getValue(items[2]);
  return `${prefix}${_three}-${_two}-${_one}${sufix}`;
};

const _rSeriaId = {
  DF: _crSeriaDf,
  pi2: _crSeriaPI2,
  pi231s: _crSeriaPI321S
};

const _crSeriaId = (option) => {
  const { dfSeriaType } = option
  , fn = _rSeriaId[dfSeriaType] || _rSeriaId.DF;
  return fn(option);
}

const EiaApi = {
  getRequestUrl(option){
    const { apiKey } = option
    , _seria_id = _crSeriaId(option);

    return `${S_URL}?api_key=${apiKey}&series_id=${_seria_id}`;
  },

  checkResponse(json){
    if (!json) {
      throw crError();
    }
    const { data } = json
    , { error:msgErr } = data || {};
    if (msgErr) {
      const _msgErr = msgErr.indexOf(MSG_ERR) !== -1
        ? MSG_ERR_NOT_EXIST
        : msgErr;
      throw crError('', _msgErr);
    }
    if (!json.series || !json.series[0]) {
      throw crError();
    }
    return true;
  }
};

export default EiaApi
