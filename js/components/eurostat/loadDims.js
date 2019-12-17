"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsonstat = _interopRequireDefault(require("jsonstat"));

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
    return "" + proxy + baseMeta + "/" + id;
  }

  return baseMeta + "/" + id;
};

var _crSelectDim = function _crSelectDim(code) {
  return (0, _extends2["default"])({
    code: code
  }, C.SELECTION_ALL);
};

var _crOption = function _crOption(dims, noTime) {
  var arrQuery = dims.map(function (dim) {
    return _crSelectDim(dim.v);
  });

  if (!noTime) {
    arrQuery.push(C.TID_DIM);
  }

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
    var _slice;

    arr.push({
      caption: c.Category(i).label,
      slice: (_slice = {}, _slice[_id] = c.id[i], _slice)
    });
  }

  return arr;
};

var IS_LOADING = false;
var URL_LOADING;
var ID_TIMEOUT;

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
      dims = _ref.dims,
      noTime = _ref.noTime;

  if (!IS_LOADING) {
    var _url = _crUrl(proxy, baseMeta, id),
        _option = _crOption(dims, noTime);

    _markStartLoading(_url);

    return fetch(_url, _option).then(function (res) {
      var status = res.status;

      if (status >= 200 && status < 400) {
        return res.json();
      } else {
        if (status === 403) {
          throw Error(MSG_403);
        }

        throw Error(MSG_HTTP_CODE + ": " + status);
      }
    }).then(function (json) {
      var _ds = (0, _jsonstat["default"])(json).Dataset(0),
          configs = dims.map(function (dim) {
        return {
          id: dim.v,
          caption: dim.c,
          options: _crSelectOptions(_ds, dim)
        };
      });

      _markStopLoading();

      return {
        configs: configs
      };
    })["catch"](function (err) {
      _markStopLoading();

      return {
        errMsg: err.message
      };
    });
  } else {
    return Promise.resolve({
      errMsg: MSG_STILL_LOADING
    });
  }
};

var _default = loadDims;
exports["default"] = _default;
//# sourceMappingURL=loadDims.js.map