"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _LoadGuard = _interopRequireDefault(require("../../utils/LoadGuard"));

var _loadDims = _interopRequireDefault(require("./loadDims"));

var _loadDimsWithOptions = _interopRequireDefault(require("./loadDimsWithOptions"));

var MSG_STILL_LOADING = "Another dialog are still loading";

var _isDimsWithOptions = function _isDimsWithOptions(dims) {
  var _len = dims.length;
  var i = 0;

  for (i; i < _len; i++) {
    if (!dims[i].options) {
      break;
    }
  }

  return i === _len;
};

var _crConfigs = function _crConfigs(dims) {
  return dims.map(function (_ref) {
    var c = _ref.c,
        v = _ref.v,
        options = _ref.options;
    return {
      id: v,
      caption: c,
      options: options
    };
  });
};

var _crUrl = function _crUrl(_ref2) {
  var _ref2$proxy = _ref2.proxy,
      proxy = _ref2$proxy === void 0 ? '' : _ref2$proxy,
      baseMeta = _ref2.baseMeta,
      dfId = _ref2.dfId;
  return "" + proxy + baseMeta + "/" + dfId;
};

var _crMetaUrl = function _crMetaUrl(props) {
  return props.metaUrl || _crUrl(props);
};

var guard = new _LoadGuard["default"]();

var loadConfigs = function loadConfigs(props) {
  if (!guard.isLoading) {
    var metaUrl = _crMetaUrl(props); //Load from dims configuration


    if (props.dims) {
      return (0, _loadDims["default"])((0, _extends2["default"])({
        metaUrl: metaUrl
      }, props));
    }

    guard.start(metaUrl);
    return (0, _loadDimsWithOptions["default"])(metaUrl).then(function (_ref3) {
      var dims = _ref3.dims,
          mapFrequency = _ref3.mapFrequency,
          timeId = _ref3.timeId;
      guard.stop();
      return _isDimsWithOptions(dims) ? {
        timeId: timeId,
        mapFrequency: mapFrequency,
        configs: _crConfigs(dims)
      } : (0, _loadDims["default"])({
        noTime: props.noTime,
        metaUrl: metaUrl,
        dims: dims,
        mapFrequency: mapFrequency,
        timeId: timeId
      });
    })["catch"](function (_ref4) {
      var errMsg = _ref4.errMsg,
          message = _ref4.message;
      guard.stop();
      return {
        errMsg: errMsg || message
      };
    });
  } else {
    return Promise.resolve({
      errMsg: MSG_STILL_LOADING
    });
  }
};

var _default = loadConfigs;
exports["default"] = _default;
//# sourceMappingURL=loadConfigs.js.map