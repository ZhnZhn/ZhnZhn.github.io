"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useEventCallback = _interopRequireDefault(require("../hooks/useEventCallback"));
var _dateFn = require("../../utils/dateFn");
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _DialogCell = _interopRequireDefault(require("./DialogCell"));
var _ZoomDailyRow = _interopRequireDefault(require("./ZoomDailyRow"));
var _jsxRuntime = require("react/jsx-runtime");
const S_DIALOG = {
    width: 244,
    marginLeft: -122
  },
  S_DATE = {
    width: 120
  };
const _isFn = fn => typeof fn === 'function';
const _getFromToDates = chart => {
  var _chart$zhGetFromToDat;
  return (_chart$zhGetFromToDat = chart.zhGetFromToDates == null ? void 0 : chart.zhGetFromToDates({
    format: _dateFn.mlsToDmy
  })) != null ? _chart$zhGetFromToDat : {};
};
const _getMinYear = strDmy => strDmy.split('-')[2];
const _crErrMsg = minYear => "DD-MM-YYYY format must be, min 01-01-" + minYear;
const _crOnTestDate = from => {
  const _minYear = _getMinYear(from);
  return [
  //onTestDate
  str => (0, _dateFn.isDmy)(str, _minYear),
  // errMsgDateFrom
  _crErrMsg(_minYear)];
};
const DF_DATA = {};

/*eslint-disable react-hooks/exhaustive-deps */
const _useZoom = (getChart, refDates) => {
  const _hZoom = (0, _uiApi.useCallback)(() => {
      const [chart, onClose] = getChart(),
        _datesInst = (0, _uiApi.getRefValue)(refDates);
      if (_isFn(chart.zhZoomX) && _datesInst.getValidation().isValid) {
        const {
          fromDate,
          toDate
        } = _datesInst.getValues();
        chart.zhZoomX({
          from: (0, _dateFn.dmyToUTC)(fromDate),
          to: (0, _dateFn.dmyToUTC)(toDate)
        });
      }
      onClose();
    }, [])
    // getChart, refDates
    ,
    _commandButtons = (0, _uiApi.useMemo)(() => [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      caption: "Zoom",
      isPrimary: true,
      onClick: _hZoom
    }, "zoom")], []);
  // _hZoom
  return [_hZoom, _commandButtons];
};
/*eslint-enable react-hooks/exhaustive-deps */

/*eslint-disable react-hooks/exhaustive-deps */
const _useZoomBy = (getChart, refDates, month) => (0, _uiApi.useCallback)(() => {
  const [chart] = getChart();
  if (_isFn(chart.zhZoomX)) {
    const {
        to
      } = _getFromToDates(chart),
      _fromMls = month ? (0, _dateFn.addToDmy)(to, month).getTime() : (0, _dateFn.getYTDfromDmy)(to),
      _toMls = (0, _dateFn.dmyToUTC)(to);
    if (chart.zhZoomX({
      from: _fromMls,
      to: _toMls
    })) {
      (0, _uiApi.getRefValue)(refDates).setFromTo((0, _dateFn.mlsToDmy)(_fromMls), to);
    }
  }
}, []);
//getChart, refDates, month
/*eslint-enable react-hooks/exhaustive-deps */

const ZoomDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    data = DF_DATA,
    onClose
  } = _ref;
  const _refDates = (0, _uiApi.useRef)(),
    _getChart = (0, _useEventCallback.default)(() => {
      const {
        chart = {}
      } = data;
      return [chart, onClose];
    }),
    [_hZoom, _commandButtons] = _useZoom(_getChart, _refDates),
    _hZoom1M = _useZoomBy(_getChart, _refDates, -1),
    _hZoom3M = _useZoomBy(_getChart, _refDates, -3),
    _hZoom6M = _useZoomBy(_getChart, _refDates, -6),
    _hZoom1Y = _useZoomBy(_getChart, _refDates, -12),
    _hZoomYTD = _useZoomBy(_getChart, _refDates),
    {
      chart = {}
    } = data,
    {
      from,
      to
    } = _getFromToDates(chart),
    [_onTestDate, _errMsgDateFrom] = _crOnTestDate(from),
    id = chart.zhGetId == null ? void 0 : chart.zhGetId(),
    _isDaily = chart.zhIsDaily == null ? void 0 : chart.zhIsDaily();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    caption: "Zoom Chart",
    style: S_DIALOG,
    isShow: isShow,
    commandButtons: _commandButtons,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.InputPeriod, {
      refEl: _refDates,
      dateStyle: S_DATE,
      placeholder: "DD-MM-YYYY",
      initFromDate: from,
      initToDate: to,
      errMsg: _errMsgDateFrom,
      isPeriodValid: _dateFn.isDmyPeriod,
      onTestDate: _onTestDate,
      onEnter: _hZoom
    }, id), _isDaily && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ZoomDailyRow.default, {
      onZoom1M: _hZoom1M,
      onZoom3M: _hZoom3M,
      onZoom6M: _hZoom6M,
      onZoomYTD: _hZoomYTD,
      onZoom1Y: _hZoom1Y
    })]
  });
});
var _default = exports.default = ZoomDialog;
//# sourceMappingURL=ZoomDialog.js.map