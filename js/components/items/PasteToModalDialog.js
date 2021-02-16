"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useProperty2 = _interopRequireDefault(require("../hooks/useProperty"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _SeriesPane = _interopRequireDefault(require("./SeriesPane"));

var S = {
  MODAL: {
    position: 'static',
    width: 365,
    height: 340,
    margin: '70px auto 0px'
  },
  SCROLL_PANE: {
    overflowY: 'auto',
    height: 250,
    paddingRight: 10
  }
};
var DF_DATA = {};

var _areEqual = function _areEqual(prevProps, _ref) {
  var isShow = _ref.isShow;
  return prevProps.isShow === isShow;
};

var _usePasteTo = function _usePasteTo(data, onClose) {
  var _useProperty = (0, _useProperty2["default"])(),
      setToChart = _useProperty[0],
      getToChart = _useProperty[1];

  setToChart(data.toChart);

  var _refCompSeries = (0, _react.useRef)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
      _hPasteTo = (0, _react.useCallback)(function () {
    var _toChart = getToChart();

    if (_toChart) {
      _refCompSeries.current.getValues().forEach(function (conf) {
        //color, data, name, userMin, userMax, yIndex
        _toChart.zhAddSeriaToYAxis(conf);
      });
    }

    onClose();
  }, []) //getToChart, onClose

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
      _commandButtons = (0, _react.useMemo)(function () {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
      caption: "Paste & Close",
      isPrimary: true,
      onClick: _hPasteTo
    }, "paste");
  }, [_hPasteTo]);

  return [getToChart(), _refCompSeries, _commandButtons];
};

var PasteToModalDialog = /*#__PURE__*/(0, _react.memo)(function (_ref2) {
  var isShow = _ref2.isShow,
      _ref2$data = _ref2.data,
      data = _ref2$data === void 0 ? DF_DATA : _ref2$data,
      onClose = _ref2.onClose;

  var _usePasteTo2 = _usePasteTo(data, onClose),
      toChart = _usePasteTo2[0],
      refCompSeries = _usePasteTo2[1],
      commandButtons = _usePasteTo2[2],
      fromChart = data.fromChart;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog["default"], {
    style: S.MODAL,
    caption: "Paste Series To",
    isShow: isShow,
    commandButtons: commandButtons,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SeriesPane["default"], {
      ref: refCompSeries,
      style: S.SCROLL_PANE,
      fromChart: fromChart,
      toChart: toChart
    })
  });
}, _areEqual);
var _default = PasteToModalDialog;
exports["default"] = _default;
//# sourceMappingURL=PasteToModalDialog.js.map