"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fnAdapter = require("./fnAdapter");
const URL = 'https://api.db.nomics.world/v22/series',
  TAIL = 'observations=1&format=json&metadata=false',
  DF_ID = 'ECB/EXR/A.USD.EUR.SP00.A';
const _crUrlImpl = (dfProvider, dfCode, seriaId) => {
  const _seriesId = dfProvider && seriaId ? (0, _fnAdapter.joinBy)('/', dfProvider, dfCode, seriaId) : `${DF_ID}`;
  return `${URL}?series_ids=${_seriesId}&${TAIL}`;
};
const _crUrl = (seriaId, option) => {
  const {
    dfProvider,
    dfCode
  } = option;
  option.seriaId = seriaId;
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};
const _dfFnUrl = option => (0, _fnAdapter.isArr)(option.items) ? _crUrl((0, _fnAdapter.getValue)(option.items[0]), option) : _crUrl('', option);
const _crIdUrl = (option, dfProvider, dfCode, seriaId) => {
  (0, _fnAdapter.assign)(option, {
    seriaId,
    dfProvider,
    dfCode
  });
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};
const _trimStr = str => (str || '').trim();
const _idFnUrl = option => {
  const {
      items
    } = option,
    value = (0, _fnAdapter.getValue)(items[0]),
    arr = value.split('/');
  return _crIdUrl(option, _trimStr(arr[0]), _trimStr(arr[1]), _trimStr(arr[2]));
};
const _crSeriaId = (_ref, values) => {
  let {
    dfPrefix,
    dfSufix
  } = _ref;
  return (0, _fnAdapter.joinBy)('.', dfPrefix, ...values, dfSufix);
};
const _fCrUrl = crValues => option => _crUrl(_crSeriaId(option, crValues(option)), option);
const _crValuesS1 = _ref2 => {
    let {
      items
    } = _ref2;
    return [(0, _fnAdapter.getValue)(items[0])];
  },
  _s1FnUrl = _fCrUrl(_crValuesS1),
  _crValuesS21 = _ref3 => {
    let {
      items,
      df1Prefix,
      df2Prefix
    } = _ref3;
    return [df1Prefix, (0, _fnAdapter.getValue)(items[1]), df2Prefix, (0, _fnAdapter.getValue)(items[0])];
  },
  _s21FnUrl = _fCrUrl(_crValuesS21),
  _crValuesS12 = _ref4 => {
    let {
      items,
      df1Prefix,
      df2Prefix
    } = _ref4;
    return [df1Prefix, (0, _fnAdapter.getValue)(items[0]), df2Prefix, (0, _fnAdapter.getValue)(items[1])];
  },
  _s12FnUrl = _fCrUrl(_crValuesS12),
  _crValuesS123B = _ref5 => {
    let {
      items,
      df2Prefix
    } = _ref5;
    return [(0, _fnAdapter.getValue)(items[0]), df2Prefix, (0, _fnAdapter.getValue)(items[1]), (0, _fnAdapter.getValue)(items[2])];
  },
  _s123BFnUrl = _fCrUrl(_crValuesS123B),
  _crValuesS123 = _ref6 => {
    let {
      items
    } = _ref6;
    return _crValuesS123B({
      items
    });
  },
  _s123FnUrl = _fCrUrl(_crValuesS123);
const _crValues3S12 = _ref7 => {
    let {
      items
    } = _ref7;
    return _crValuesS12({
      items
    });
  },
  _s3S12FnUrl = option => {
    const {
      items,
      dfCode,
      subtitle
    } = option;
    (0, _fnAdapter.assign)(option, {
      dfCode: `${dfCode}:${(0, _fnAdapter.getValue)(items[2])}`,
      subtitle: (subtitle || "").split(':')[0] || ''
    });
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
  s3S12: _s3S12FnUrl
};
const DbNomicsApi = {
  getRequestUrl(option) {
    if (option.url) {
      return option.url;
    }
    const {
        dfFnUrl
      } = option,
      _crUrl = dfFnUrl && _rFnUrl[dfFnUrl] || _rFnUrl.DF;
    return option.url = _crUrl(option);
  },
  checkResponse(json) {
    const {
      errors
    } = json || {};
    if ((0, _fnAdapter.isArr)(errors)) {
      throw (0, _fnAdapter.crErrorByMessage)((errors[0] || {}).message);
    }
    const docs = (0, _fnAdapter.getDocs)(json),
      _ts = (0, _fnAdapter.isArr)(docs) ? docs[0] : '';
    if (!_ts || !(0, _fnAdapter.isArr)(_ts.period) || !(0, _fnAdapter.isArr)(_ts.value)) {
      throw (0, _fnAdapter.crErrorByMessage)();
    }
  }
};
var _default = exports.default = DbNomicsApi;
//# sourceMappingURL=DbNomicsApi.js.map