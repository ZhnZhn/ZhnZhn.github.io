"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));

var _IndicatorBuilder = require("../../charts/IndicatorBuilder");

var _RowType = _interopRequireDefault(require("./RowType2"));

var _jsxRuntime = require("react/jsx-runtime");

const _isArray = Array.isArray;
const SMA_MONTH = '12',
      SMA_YEAR = '50';

const _findInitSma = config => {
  const _d = (((config || {}).series || [])[0] || {}).data;
  return !_isArray(_d) ? '0' : _d.length > 150 ? SMA_YEAR : SMA_MONTH;
};

const _isInArrObjWithId = (arrObj, id) => !!arrObj.find(obj => obj.id === id);

const _crId = period => "SMA(" + period + ")";

const RowSma = _ref => {
  let {
    config,
    getChart
  } = _ref;

  const _initialSma = (0, _useRefInit.default)(() => _findInitSma(config)),
        _refPeriod = (0, _react.useRef)(),
        [smaConfs, setSmaConfs] = (0, _react.useState)([]),
        _onAddSma = () => {
    const period = _refPeriod.current.getValue(),
          id = _crId(period);

    if (!_isInArrObjWithId(smaConfs, id)) {
      const chart = getChart(),
            color = (0, _IndicatorBuilder.addSmaTo)(chart, {
        id,
        period
      });

      if (color) {
        setSmaConfs([...smaConfs, {
          id,
          color
        }]);
      }
    }
  },
        _onRemoveSma = id => {
    const chart = getChart();

    if ((0, _IndicatorBuilder.removeSeriaFrom)(chart, id)) {
      setSmaConfs(smaConfs.filter(d => d.id !== id));
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowType.default, {
    forwardRef: _refPeriod,
    caption: "SMA",
    initValue: _initialSma,
    configs: smaConfs,
    onAdd: _onAddSma,
    onRemove: _onRemoveSma
  });
};

var _default = RowSma;
exports.default = _default;
//# sourceMappingURL=RowSma.js.map