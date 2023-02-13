"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useBool = _interopRequireDefault(require("../hooks/useBool"));
const _isNumber = n => typeof n === 'number',
  _isFn = fn => typeof fn === 'function';
const _crName = (prefixStr, nOrObj) => {
  const _suffix = _isNumber(nOrObj) ? "(" + nOrObj + ")" : '';
  return "" + prefixStr + _suffix;
};
const _isSeriaInst = s => s && _isFn(s.setVisible);
const _getSeriaIndex = (chart, _ref) => {
  let {
    s
  } = _ref;
  const _index = _isNumber(s) ? s - 1 : 0;
  return (chart == null ? void 0 : chart.series.length) > _index ? _index : 0;
};
const useAddSeriaBy = (confArr, getChart) => {
  const _refSeria = (0, _uiApi.useRef)(),
    [isSeria, showSeria, hideSeria] = (0, _useBool.default)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    addSeriaBy = (0, _uiApi.useCallback)(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      const [seriaOptions, fnOptions] = args.length === 1 ? [{}] : args,
        [seriaPropName, color, fn] = confArr,
        name = _crName(seriaPropName, fnOptions);
      const _chart = getChart();
      if (_chart) {
        const _seria = (0, _uiApi.getRefValue)(_refSeria);
        if (_isSeriaInst(_seria)) {
          _seria.setVisible(true);
        } else {
          const seriaIndex = _getSeriaIndex(_chart, seriaOptions),
            data = _chart.series[seriaIndex].data,
            seriaData = fn(data, fnOptions);
          (0, _uiApi.setRefValue)(_refSeria, _chart.zhAddSeriaToYAxis({
            data: seriaData,
            color: seriaOptions.color || color,
            name
          }, seriaOptions));
        }
        showSeria();
      }
    }, [getChart])
    // confArr, showSeria
    ,
    hideSeriaBy = (0, _uiApi.useCallback)(() => {
      const isRemove = confArr[3],
        _seria = (0, _uiApi.getRefValue)(_refSeria);
      if (_isSeriaInst(_seria)) {
        if (isRemove) {
          _seria.yAxis.remove();
          (0, _uiApi.setRefValue)(_refSeria, null);
        } else {
          _seria.setVisible(false);
        }
        hideSeria();
      }
    }, []);
  //confArr, hideSeria
  /*eslint-enable react-hooks/exhaustive-deps */

  return [isSeria, addSeriaBy, hideSeriaBy];
};
var _default = useAddSeriaBy;
exports.default = _default;
//# sourceMappingURL=useAddSeriaBy.js.map