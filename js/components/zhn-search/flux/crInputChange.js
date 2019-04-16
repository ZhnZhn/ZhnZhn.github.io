'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _memoizeOne = require('memoize-one');

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _throttle = require('../../../utils/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  }).catch(function (err) {
    action.loadingFailed();
    if (_isFn(api.onError)) {
      api.onError(err.message);
    } else {
      console.log(err);
    }
  });
};

var _crInputChange = function _crInputChange(action, api) {
  var ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DF_MS;
  return (0, _throttle2.default)(function (value) {
    if (_isLoading(value)) {
      action.loading();
      var options = _crOptions(api);
      if (!options) {
        action.loadingFailed();
      } else {
        _fetchUrl({ api: api, action: action, value: value, options: options });
      }
    }
  }, ms, { trailing: true, leading: false });
};

exports.default = (0, _memoizeOne2.default)(_crInputChange);
//# sourceMappingURL=crInputChange.js.map