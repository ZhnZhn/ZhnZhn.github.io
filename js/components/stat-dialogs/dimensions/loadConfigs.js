"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _LoadGuard = _interopRequireDefault(require("../../../utils/LoadGuard"));

var _loadConfigsImplA = _interopRequireDefault(require("./loadConfigsImplA"));

var _loadConfigsImplB = _interopRequireDefault(require("./loadConfigsImplB"));

const MSG_STILL_LOADING = "Another dialog are still loading",
      MSG_INCORRECT_CONFIG = 'Incorrect dialog configuration',
      _isArr = Array.isArray;
const guard = new _LoadGuard.default();

const _crLoadErr = ({
  errMsg,
  message
}) => ({
  errMsg: errMsg || message
});

const _getLoad = props => {
  const {
    dfQ
  } = props;
  return !_isArr(dfQ) ? _loadConfigsImplA.default : dfQ.length === 2 ? _loadConfigsImplB.default : void 0;
};

const loadConfigs = props => {
  if (guard.isLoading) {
    return Promise.resolve({
      errMsg: MSG_STILL_LOADING
    });
  } else {
    const _load = _getLoad(props);

    if (_load) {
      return _load(guard, props).catch(_crLoadErr).finally(() => guard.stop());
    }

    return Promise.resolve({
      errMsg: MSG_INCORRECT_CONFIG
    });
  }
};

var _default = loadConfigs;
exports.default = _default;
//# sourceMappingURL=loadConfigs.js.map