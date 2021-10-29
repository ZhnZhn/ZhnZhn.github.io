"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _SeriesPane = _interopRequireDefault(require("./SeriesPane"));

var _jsxRuntime = require("react/jsx-runtime");

const S_MODAL = {
  position: 'static',
  width: 365,
  height: 340,
  margin: '70px auto 0px'
},
      S_SERIES_PANE = {
  overflowY: 'auto',
  height: 250,
  padding: '8px 10px 0 0'
};
const DF_DATA = {};

const _areEqual = (prevProps, {
  isShow
}) => prevProps.isShow === isShow;

const _usePasteTo = (data, onClose) => {
  const [setToChart, getToChart] = (0, _useProperty.default)();
  setToChart(data.toChart);

  const _refCompSeries = (0, _react.useRef)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hPasteTo = (0, _react.useCallback)(() => {
    const _toChart = getToChart();

    if (_toChart) {
      _refCompSeries.current.getValues().forEach(conf => {
        //color, data, name, userMin, userMax, yIndex
        _toChart.zhAddSeriaToYAxis(conf);
      });
    }

    onClose();
  }, []) //getToChart, onClose

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _commandButtons = (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    caption: "Paste & Close",
    isPrimary: true,
    onClick: _hPasteTo
  }, "paste"), [_hPasteTo]);

  return [getToChart(), _refCompSeries, _commandButtons];
};

const PasteToModalDialog = /*#__PURE__*/(0, _react.memo)(({
  isShow,
  data = DF_DATA,
  onClose
}) => {
  const [toChart, refCompSeries, commandButtons] = _usePasteTo(data, onClose),
        {
    fromChart
  } = data;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    isShow: isShow,
    style: S_MODAL,
    caption: "Paste Series To",
    commandButtons: commandButtons,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SeriesPane.default, {
      ref: refCompSeries,
      style: S_SERIES_PANE,
      fromChart: fromChart,
      toChart: toChart
    })
  });
}, _areEqual);
var _default = PasteToModalDialog;
exports.default = _default;
//# sourceMappingURL=PasteToModalDialog.js.map