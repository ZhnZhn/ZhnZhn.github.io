"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _loadDimsWithOptions = _interopRequireDefault(require("./loadDimsWithOptions"));

var _crDimUrl = _interopRequireDefault(require("./crDimUrl"));

var _crConfigs = _interopRequireDefault(require("./crConfigs"));

const MSG_DIMS = 'Loaded dims without options';

const _isDimsWithOptions = dims => {
  const _len = dims.length;
  let i = 0;

  for (i; i < _len; i++) {
    if (!dims[i].options) {
      break;
    }
  }

  return i === _len;
};

const loadConfigsImplA = (guard, props) => {
  const dimUrl = (0, _crDimUrl.default)(props),
        propDims = props.dims;
  guard.start(dimUrl);
  return (0, _loadDimsWithOptions.default)(dimUrl).then(({
    dims,
    mapFrequency,
    timeId
  }) => {
    if (!_isDimsWithOptions(dims)) {
      throw {
        errMsg: MSG_DIMS
      };
    }

    return {
      timeId,
      mapFrequency,
      configs: (0, _crConfigs.default)(dims, propDims)
    };
  });
};

var _default = loadConfigsImplA;
exports.default = _default;
//# sourceMappingURL=loadConfigsImplA.js.map