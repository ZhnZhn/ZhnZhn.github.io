"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useProperty = require("../hooks/useProperty");
var _useCommandButtons = _interopRequireDefault(require("../zhn-moleculs/useCommandButtons"));
const usePasteTo = (data, onClose) => {
  const [setToChart, getToChart] = (0, _useProperty.useProperty)();
  setToChart(data.toChart);
  const _refCompSeries = (0, _uiApi.useRef)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hPasteTo = (0, _uiApi.useCallback)(() => {
      const _toChart = getToChart(),
        _seriesInst = (0, _uiApi.getRefValue)(_refCompSeries);
      if (_toChart && _seriesInst) {
        _seriesInst.getValues().forEach(conf => {
          //color, data, name, userMin, userMax, yIndex
          _toChart.zhAddSeriaToYAxis(conf);
        });
      }
      onClose();
    }, [])
    //getToChart, onClose
    ,
    _commandButtons = (0, _useCommandButtons.default)(() => [["Paste & Close", _hPasteTo]]);
  return [getToChart(), _refCompSeries, _commandButtons];
};
var _default = exports.default = usePasteTo;
//# sourceMappingURL=usePasteTo.js.map