"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _debounceFn = _interopRequireDefault(require("../../../utils/debounceFn"));

const DF_MS = 5000;

const _isFn = fn => typeof fn === 'function';

const _isValue = value => value && value.length > 1;

const _crOptions = api => _isFn(api.crUrlOptions) ? api.crUrlOptions() : true;

const _fetchUrl = _ref => {
  let {
    api,
    value,
    options,
    action
  } = _ref;
  return fetch(api.crUrl(value, options)).then(res => {
    const {
      status
    } = res;

    if (status >= 200 && status < 400) {
      return res.json();
    } else {
      throw new Error('Respond status: ' + status);
    }
  }).then(json => {
    action.loaded(api.crOptions(json));
  }).catch(err => {
    action.loadingFailed();

    if (_isFn(api.onError)) {
      api.onError(err.message);
    } else {
      console.log(err);
    }
  });
};

const _crInputChange = (action, api, ms) => (0, _debounceFn.default)(value => {
  if (_isValue(value)) {
    action.loading();

    const options = _crOptions(api);

    if (!options) {
      action.loadingFailed();
    } else {
      _fetchUrl({
        api,
        action,
        value,
        options
      });
    }
  }
}, ms || DF_MS);

var _default = (0, _memoizeOne.default)(_crInputChange);

exports.default = _default;
//# sourceMappingURL=crInputChange.js.map