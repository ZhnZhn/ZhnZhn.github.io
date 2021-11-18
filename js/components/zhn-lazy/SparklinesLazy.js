"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crRetryableLazy = _interopRequireDefault(require("./crRetryableLazy"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const _getComp = name => module => ({
  default: module.default[name]
});

const _fLazy = compName => () => Promise.resolve().then(() => _interopRequireWildcard(require('../zhn-sparklines/Sparklines'))).then(_getComp(compName));

const Comp = {
  SparkView: (0, _crRetryableLazy.default)(_fLazy('SparkView')),
  Line: (0, _crRetryableLazy.default)(_fLazy('Line')),
  Bars: (0, _crRetryableLazy.default)(_fLazy('Bars')),
  ReferenceLine: (0, _crRetryableLazy.default)(_fLazy('ReferenceLine')),
  Spot: (0, _crRetryableLazy.default)(_fLazy('Spot')),
  Spots: (0, _crRetryableLazy.default)(_fLazy('Spot')),
  MaxLabel: (0, _crRetryableLazy.default)(_fLazy('MaxLabel')),
  MinLabel: (0, _crRetryableLazy.default)(_fLazy('MinLabel'))
};
var _default = Comp;
exports.default = _default;
//# sourceMappingURL=SparklinesLazy.js.map