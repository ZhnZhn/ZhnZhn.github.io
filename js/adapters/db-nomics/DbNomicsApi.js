"use strict";

exports.__esModule = true;
exports.default = void 0;

var _fnAdapter = require("./fnAdapter");

const URL = 'https://api.db.nomics.world/v22/series',
      TAIL = 'observations=1&format=json&metadata=false',
      DF_ID = 'ECB/EXR/A.USD.EUR.SP00.A';

const _isArr = Array.isArray,
      _crErr = _fnAdapter.crError.bind(null, '');

const _crUrlImpl = (dfProvider, dfCode, seriaId) => !dfProvider || !dfCode || !seriaId ? URL + "?series_ids=" + DF_ID + "&" + TAIL : URL + "?series_ids=" + dfProvider + "/" + dfCode + "/" + seriaId + "&" + TAIL;

const _crUrl = (seriaId, option) => {
  const {
    dfProvider,
    dfCode
  } = option;
  option.seriaId = seriaId;
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};

const _dfFnUrl = option => _isArr(option.items) ? _crUrl((0, _fnAdapter.getValue)(option.items[0]), option) : _crUrl('', option);

const _crIdUrl = (option, dfProvider, dfCode, seriaId) => {
  (0, _fnAdapter._assign)(option, {
    seriaId,
    dfProvider,
    dfCode
  });
  return _crUrlImpl(dfProvider, dfCode, seriaId);
};

const _trimStr = function (str) {
  if (str === void 0) {
    str = '';
  }

  return str.trim();
};

const _idFnUrl = option => {
  const {
    items
  } = option,
        value = (0, _fnAdapter.getValue)(items[0]),
        arr = value.split('/');
  return _crIdUrl(option, _trimStr(arr[0]), _trimStr(arr[1]), _trimStr(arr[2]));
};

const _crSeriaId = function (_ref) {
  let {
    dfPrefix,
    dfSufix
  } = _ref;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [dfPrefix, ...args, dfSufix].filter(Boolean).join('.');
};

const _s1FnUrl = option => {
  const {
    items
  } = option,
        _seriaId = _crSeriaId(option, (0, _fnAdapter.getValue)(items[0]));

  return _crUrl(_seriaId, option);
};

const _s21FnUrl = option => {
  const {
    items,
    df1Prefix,
    df2Prefix
  } = option,
        _seriaId = _crSeriaId(option, df1Prefix, (0, _fnAdapter.getValue)(items[1]), df2Prefix, (0, _fnAdapter.getValue)(items[0]));

  return _crUrl(_seriaId, option);
};

const _s12FnUrl = option => {
  const {
    items,
    df1Prefix,
    df2Prefix
  } = option,
        _seriaId = _crSeriaId(option, df1Prefix, (0, _fnAdapter.getValue)(items[0]), df2Prefix, (0, _fnAdapter.getValue)(items[1]));

  return _crUrl(_seriaId, option);
};

const _s123BFnUrl = option => {
  const {
    items,
    df2Prefix
  } = option,
        _seriaId = _crSeriaId(option, (0, _fnAdapter.getValue)(items[0]), df2Prefix, (0, _fnAdapter.getValue)(items[1]), (0, _fnAdapter.getValue)(items[2]));

  return _crUrl(_seriaId, option);
};

const _s123FnUrl = option => {
  const {
    items
  } = option,
        _seriaId = _crSeriaId(option, (0, _fnAdapter.getValue)(items[0]), (0, _fnAdapter.getValue)(items[1]), (0, _fnAdapter.getValue)(items[2]));

  return _crUrl(_seriaId, option);
};

const _s3S12FnUrl = option => {
  const {
    items,
    dfCode,
    subtitle
  } = option,
        v1 = (0, _fnAdapter.getValue)(items[0]),
        v2 = (0, _fnAdapter.getValue)(items[1]),
        v3 = (0, _fnAdapter.getValue)(items[2]),
        _seriaId = _crSeriaId(option, v1, v2);

  (0, _fnAdapter._assign)(option, {
    dfCode: dfCode + ":" + v3,
    subtitle: (subtitle || []).split(':')[0] || ''
  });
  return _crUrl(_seriaId, option);
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
          _crUrl = _rFnUrl[dfFnUrl] || _rFnUrl.DF;

    return option.url = _crUrl(option);
  },

  checkResponse(json) {
    if (json && _isArr(json.errors)) {
      throw _crErr(json.errors[0].message);
    }

    const docs = json && json.series && json.series.docs;

    if (!_isArr(docs) || !docs[0] || !_isArr(docs[0].period) || !_isArr(docs[0].value)) {
      throw _crErr();
    }

    return true;
  }

};
var _default = DbNomicsApi;
exports.default = _default;
//# sourceMappingURL=DbNomicsApi.js.map