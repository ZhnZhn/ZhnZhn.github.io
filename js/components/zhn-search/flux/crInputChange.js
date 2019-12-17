"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _throttle = _interopRequireDefault(require("../../../utils/throttle"));

var DF_MS = 5000;

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _isLoading = function _isLoading(value) {
  return value && value.length > 1;
};

var _crOptions = function _crOptions(api) {
  return _isFn(api.crUrlOptions) ? api.crUrlOptions() : true;
};

var _fetchUrl = function _fetchUrl(_ref) {
  var api = _ref.api,
      value = _ref.value,
      options = _ref.options,
      action = _ref.action;
  return fetch(api.crUrl(value, options)).then(function (res) {
    var status = res.status;

    if (status >= 200 && status < 400) {
      return res.json();
    } else {
      throw new Error('Respond status: ' + status);
    }
  }).then(function (json) {
    action.loaded(api.crOptions(json));
  })["catch"](function (err) {
    action.loadingFailed();

    if (_isFn(api.onError)) {
      api.onError(err.message);
    } else {
      console.log(err);
    }
  });
};

var _crInputChange = function _crInputChange(action, api, ms) {
  if (ms === void 0) {
    ms = DF_MS;
  }

  return (0, _throttle["default"])(function (value) {
    if (_isLoading(value)) {
      action.loading();

      var options = _crOptions(api);

      if (!options) {
        action.loadingFailed();
      } else {
        _fetchUrl({
          api: api,
          action: action,
          value: value,
          options: options
        });
      }
    }
  }, ms, {
    trailing: true,
    leading: false
  });
};

var _default = (0, _memoizeOne["default"])(_crInputChange);

exports["default"] = _default;
//# sourceMappingURL=crInputChange.js.map