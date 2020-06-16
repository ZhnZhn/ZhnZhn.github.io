"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsonstat = _interopRequireDefault(require("jsonstat"));

var _LoadGuard = _interopRequireDefault(require("../../utils/LoadGuard"));

var _loadJson = _interopRequireDefault(require("./loadJson"));

var MSG_STILL_LOADING = "Another dims are still loading";
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

var _fNotTimeDimension = function _fNotTimeDimension(timeId) {
  return function (config) {
    return config.id !== timeId;
  };
};

var _crConfigs = function _crConfigs(json, dims, timeId) {
  var _ds = (0, _jsonstat["default"])(json).Dataset(0),
      configs = dims.map(function (dim) {
    return {
      id: dim.v,
      caption: dim.c,
      options: _crSelectOptions(_ds, dim)
    };
  }).filter(_fNotTimeDimension(timeId));

  return configs;
};

var guard = new _LoadGuard["default"]();

var loadDims = function loadDims(_ref) {
  var metaUrl = _ref.metaUrl,
      _ref$dims = _ref.dims,
      dims = _ref$dims === void 0 ? [] : _ref$dims,
      noTime = _ref.noTime,
      timeId = _ref.timeId;

  if (!guard.isLoading) {
    var _option = _crOption(dims, noTime);

    guard.start(metaUrl);
    return (0, _loadJson["default"])(metaUrl, _option).then(function (json) {
      var configs = _crConfigs(json, dims, timeId);

      guard.stop();
      return {
        configs: configs
      };
    })["catch"](function (err) {
      guard.stop();
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