'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsonstat = require('jsonstat');

var _jsonstat2 = _interopRequireDefault(_jsonstat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MSG_STILL_LOADING = "Another dims are still loading";
var MSG_403 = 'HTTP Code 403: Forbitten.\nMaybe, require API key.';
var MSG_HTTP_CODE = 'HTTP Code';

var C = {
  SELECTION_ALL: {
    selection: {
      filter: 'all',
      values: ['*']
    }
  },
  TID_DIM: {
    code: "Tid",
    selection: {
      filter: "top",
      values: ["1"]
    }
  }
};

var _crUrl = function _crUrl(proxy, baseMeta, id) {
  if (proxy) {
    return '' + proxy + baseMeta + '/' + id;
  }
  return baseMeta + '/' + id;
};

var _crSelectDim = function _crSelectDim(code) {
  return (0, _extends3.default)({ code: code }, C.SELECTION_ALL);
};

var _crOption = function _crOption(dims) {
  var arrQuery = dims.map(function (dim) {
    return _crSelectDim(dim.v);
  });

  arrQuery.push(C.TID_DIM);

  return {
    method: 'POST',
    body: JSON.stringify({
      query: arrQuery,
      response: {
        format: "json-stat"
      }
    })
  };
};

var _crSelectOptions = function _crSelectOptions(ds, dim) {
  var arr = [],
      _id = dim.v,
      c = ds.Dimension(_id),
      len = c.length;
  var i = 0;
  for (; i < len; i++) {
    arr.push({
      caption: c.Category(i).label,
      slice: (0, _defineProperty3.default)({}, _id, c.id[i])
    });
  }
  return arr;
};

var IS_LOADING = false;
var URL_LOADING = void 0;
var ID_TIMEOUT = void 0;
var _fClearLoading = function _fClearLoading(url) {
  return function () {
    if (url === URL_LOADING) {
      IS_LOADING = false;
    }
  };
};
var _markStartLoading = function _markStartLoading(url) {
  URL_LOADING = url;
  ID_TIMEOUT = setTimeout(_fClearLoading(url), 5000);
  IS_LOADING = true;
};
var _markStopLoading = function _markStopLoading() {
  IS_LOADING = false;
  clearTimeout(ID_TIMEOUT);
};

var loadDims = function loadDims(_ref) {
  var proxy = _ref.proxy,
      baseMeta = _ref.baseMeta,
      id = _ref.id,
      dims = _ref.dims;

  if (!IS_LOADING) {
    var _url = _crUrl(proxy, baseMeta, id),
        _option = _crOption(dims);
    _markStartLoading(_url);
    return fetch(_url, _option).then(function (res) {
      var status = res.status;

      if (status >= 200 && status < 400) {
        return res.json();
      } else {
        if (status === 403) {
          throw Error(MSG_403);
        }
        throw Error(MSG_HTTP_CODE + ': ' + status);
      }
    }).then(function (json) {
      var _ds = (0, _jsonstat2.default)(json).Dataset(0),
          configs = dims.map(function (dim) {
        return {
          id: dim.v,
          caption: dim.c,
          options: _crSelectOptions(_ds, dim)
        };
      });
      _markStopLoading();
      return { configs: configs };
    }).catch(function (err) {
      _markStopLoading();
      return { errMsg: err.message };
    });
  } else {
    return Promise.resolve({ errMsg: MSG_STILL_LOADING });
  }
};

exports.default = loadDims;
//# sourceMappingURL=loadDims.js.map