"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _ZoomDailyRow = _interopRequireDefault(require("./ZoomDailyRow"));

var S = {
  DIALOG: {
    width: 244,
    marginLeft: -122
  },
  DATE: {
    width: 120
  }
};
var isDmy = _DateUtils["default"].isDmy,
    dmyToMls = _DateUtils["default"].dmyToMls,
    isDmyPeriod = _DateUtils["default"].isDmyPeriod,
    mlsToDmy = _DateUtils["default"].mlsToDmy,
    addToDmy = _DateUtils["default"].addToDmy,
    getYTDfromDmy = _DateUtils["default"].getYTDfromDmy;

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _getFromToDates = function _getFromToDates(chart) {
  var _ref;

  return (_ref = chart.zhGetFromToDates == null ? void 0 : chart.zhGetFromToDates({
    format: mlsToDmy
  })) != null ? _ref : {};
};

var _getMinYear = function _getMinYear(strDmy) {
  return strDmy.split('-')[2];
};

var _crErrMsg = function _crErrMsg(minYear) {
  return "DD-MM-YYYY format must be, min 01-01-" + minYear;
};

var ZoomDialog =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ZoomDialog, _Component);

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.object,
    onClose: PropTypes.func
  }
  */
  function ZoomDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._getChart = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          onClose = _this$props.onClose,
          _data$chart = data.chart,
          chart = _data$chart === void 0 ? {} : _data$chart;
      return {
        chart: chart,
        onClose: onClose
      };
    };

    _this._hZoom = function () {
      var _this$_getChart = _this._getChart(),
          chart = _this$_getChart.chart,
          onClose = _this$_getChart.onClose;

      if (_isFn(chart.zhZoomX) && _this._dates.getValidation().isValid) {
        var _this$_dates$getValue = _this._dates.getValues(),
            fromDate = _this$_dates$getValue.fromDate,
            toDate = _this$_dates$getValue.toDate;

        chart.zhZoomX({
          from: dmyToMls(fromDate),
          to: dmyToMls(toDate)
        });
      }

      onClose();
    };

    _this._hZoomBy = function (month) {
      var _this$_getChart2 = _this._getChart(),
          chart = _this$_getChart2.chart;

      if (_isFn(chart.zhZoomX)) {
        var _getFromToDates2 = _getFromToDates(chart),
            to = _getFromToDates2.to,
            _fromMls = addToDmy(to, month).getTime();

        if (chart.zhZoomX({
          from: _fromMls,
          to: dmyToMls(to)
        })) {
          _this._dates.setFromTo(mlsToDmy(_fromMls), to);
        }
      }
    };

    _this._hZoomYTD = function () {
      var _this$_getChart3 = _this._getChart(),
          chart = _this$_getChart3.chart;

      if (_isFn(chart.zhZoomX)) {
        var _getFromToDates3 = _getFromToDates(chart),
            to = _getFromToDates3.to,
            _fromMls = getYTDfromDmy(to);

        if (chart.zhZoomX({
          from: _fromMls,
          to: dmyToMls(to)
        })) {
          _this._dates.setFromTo(mlsToDmy(_fromMls), to);
        }
      }
    };

    _this._refDates = function (c) {
      return _this._dates = c;
    };

    _this._hZoom1M = _this._hZoomBy.bind(null, -1);
    _this._hZoom3M = _this._hZoomBy.bind(null, -3);
    _this._hZoom6M = _this._hZoomBy.bind(null, -6);
    _this._hZoom1Y = _this._hZoomBy.bind(null, -12);
    _this._commandButtons = [_react["default"].createElement(_DialogCell["default"].Button.Flat, {
      key: "zoom",
      caption: "Zoom",
      isPrimary: true,
      onClick: _this._hZoom
    })];
    return _this;
  }

  var _proto = ZoomDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        isShow = _this$props2.isShow,
        data = _this$props2.data,
        onClose = _this$props2.onClose,
        _data$chart2 = data.chart,
        chart = _data$chart2 === void 0 ? {} : _data$chart2,
        _getFromToDates4 = _getFromToDates(chart),
        from = _getFromToDates4.from,
        to = _getFromToDates4.to,
        _minYear = _getMinYear(from),
        _onTestDate = function _onTestDate(str) {
      return isDmy(str, _minYear);
    },
        _errMsgDateFrom = _crErrMsg(_minYear),
        id = chart.zhGetId == null ? void 0 : chart.zhGetId(),
        _isDaily = chart.zhIsDaily == null ? void 0 : chart.zhIsDaily();

    return _react["default"].createElement(_ModalDialog["default"], {
      caption: "Zoom Chart",
      style: S.DIALOG,
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: onClose
    }, _react["default"].createElement(_DialogCell["default"].DatesFragment, {
      key: id,
      ref: this._refDates,
      dateStyle: S.DATE,
      placeholder: "DD-MM-YYYY",
      initFromDate: from,
      initToDate: to,
      errMsg: _errMsgDateFrom,
      isPeriodValid: isDmyPeriod,
      onTestDate: _onTestDate,
      onEnter: this._hZoom
    }), _isDaily && _react["default"].createElement(_ZoomDailyRow["default"], {
      onZoom1M: this._hZoom1M,
      onZoom3M: this._hZoom3M,
      onZoom6M: this._hZoom6M,
      onZoomYTD: this._hZoomYTD,
      onZoom1Y: this._hZoom1Y
    }));
  };

  return ZoomDialog;
}(_react.Component);

ZoomDialog.defaultProps = {
  data: {}
};
var _default = ZoomDialog;
exports["default"] = _default;
//# sourceMappingURL=ZoomDialog.js.map