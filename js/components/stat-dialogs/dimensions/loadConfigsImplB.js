"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _loadDimsWithOptions = _interopRequireDefault(require("./loadDimsWithOptions"));

var _crDimUrlEs = _interopRequireDefault(require("./crDimUrlEs"));

var _crConfigs = _interopRequireDefault(require("./crConfigs"));

const _delay = mls => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), mls);
  });
};

const _getOptLength = dims => (dims.options || []).length;

const _removeDuplicate = dims => {
  const _hmDim = Object.create(null);

  dims.forEach(dim => {
    const _id = dim.v,
          _dim = _hmDim[_id];

    if (!_dim || _getOptLength(_dim) < _getOptLength(dim)) {
      _hmDim[_id] = dim;
    }
  });
  return Object.keys(_hmDim).map(k => _hmDim[k]);
};

const loadConfigsImplB = (guard, props) => {
  const {
    dfQ
  } = props,
        dimUrl1 = (0, _crDimUrlEs.default)(props, dfQ[0]),
        dimUrl2 = (0, _crDimUrlEs.default)(props, dfQ[1]);
  let _dims = [];
  guard.start(dimUrl1);
  return (0, _loadDimsWithOptions.default)(dimUrl1).then(({
    dims
  }) => {
    _dims = _dims.concat(dims);
  }).then(() => _delay(5000)).then(() => {
    guard.stop();
    guard.start(dimUrl2);
    return (0, _loadDimsWithOptions.default)(dimUrl2);
  }).then(({
    dims,
    mapFrequency,
    timeId
  }) => {
    _dims = _removeDuplicate(_dims.concat(dims));
    return {
      timeId: 'time',
      mapFrequency,
      configs: (0, _crConfigs.default)(_dims)
    };
  });
};

var _default = loadConfigsImplB;
exports.default = _default;
//# sourceMappingURL=loadConfigsImplB.js.map