'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _DialogCell = require('./DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  DIALOG: {
    width: 244,
    marginLeft: -122
  },
  DATE: {
    width: 120
  },
  PERIOD_BTS: {
    paddingTop: 8,
    paddingLeft: 8
  },
  BT: {
    color: '#1b2836'
  }
};

var isDmy = _DateUtils2.default.isDmy,
    dmyToUTC = _DateUtils2.default.dmyToUTC,
    mlsToDmy = _DateUtils2.default.mlsToDmy,
    addToDmy = _DateUtils2.default.addToDmy,
    getYTDfromDmy = _DateUtils2.default.getYTDfromDmy;


var _isPeriodValid = function _isPeriodValid(from, to) {
  return dmyToUTC(from) <= dmyToUTC(to);
};
var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _getFromToDates = function _getFromToDates(chart) {
  return _isFn(chart.zhGetFromToDates) ? chart.zhGetFromToDates({ format: mlsToDmy }) : {};
};

var ZoomDialog = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ZoomDialog, _Component);

  function ZoomDialog(props) {
    (0, _classCallCheck3.default)(this, ZoomDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ZoomDialog.__proto__ || Object.getPrototypeOf(ZoomDialog)).call(this, props));

    _this._getChart = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          onClose = _this$props.onClose,
          _data$chart = data.chart,
          chart = _data$chart === undefined ? {} : _data$chart;

      return { chart: chart, onClose: onClose };
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
          from: dmyToUTC(fromDate),
          to: dmyToUTC(toDate)
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
          to: dmyToUTC(to)
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
          to: dmyToUTC(to)
        })) {
          _this._dates.setFromTo(mlsToDmy(_fromMls), to);
        }
      }
    };

    _this._refDates = function (c) {
      return _this._dates = c;
    };

    _this._hZoomBy1M = _this._hZoomBy.bind(_this, -1);
    _this._hZoomBy3M = _this._hZoomBy.bind(_this, -3);
    _this._hZoomBy6M = _this._hZoomBy.bind(_this, -6);
    _this._hZoomBy1Y = _this._hZoomBy.bind(_this, -12);

    _this._commandButtons = [_react2.default.createElement(_DialogCell2.default.Button.Flat, {
      key: 'zoom',
      caption: 'Zoom',
      isPrimary: true,
      onClick: _this._hZoom
    })];
    return _this;
  }
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.object,
    onClose: PropTypes.func
  }
  */

  (0, _createClass3.default)(ZoomDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          data = _props.data,
          onClose = _props.onClose,
          _data$chart2 = data.chart,
          chart = _data$chart2 === undefined ? {} : _data$chart2,
          _getFromToDates4 = _getFromToDates(chart),
          from = _getFromToDates4.from,
          to = _getFromToDates4.to,
          id = _isFn(chart.zhGetId) ? chart.zhGetId() : void 0;

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: 'Zoom Chart',
          style: S.DIALOG,
          isShow: isShow,
          commandButtons: this._commandButtons,
          onClose: onClose
        },
        _react2.default.createElement(_DialogCell2.default.DatesFragment, {
          key: id,
          ref: this._refDates,
          dateStyle: S.DATE,
          placeholder: 'DD-MM-YYYY',
          initFromDate: from,
          initToDate: to,
          errMsg: 'DD-MM-YYYY format must be, min 01-01-1990',
          isPeriodValid: _isPeriodValid,
          onTestDate: isDmy,
          onEnter: this._hZoom
        }),
        _react2.default.createElement(
          'div',
          { style: S.PERIOD_BTS },
          _react2.default.createElement(_DialogCell2.default.Button.Flat, {
            rootStyle: S.BT,
            key: '1M',
            caption: '1M',
            onClick: this._hZoomBy1M
          }),
          _react2.default.createElement(_DialogCell2.default.Button.Flat, {
            rootStyle: S.BT,
            key: '3M',
            caption: '3M',
            onClick: this._hZoomBy3M
          }),
          _react2.default.createElement(_DialogCell2.default.Button.Flat, {
            rootStyle: S.BT,
            key: '6M',
            caption: '6M',
            onClick: this._hZoomBy6M
          }),
          _react2.default.createElement(_DialogCell2.default.Button.Flat, {
            rootStyle: S.BT,
            key: 'YTD',
            caption: 'YTD',
            onClick: this._hZoomYTD
          }),
          _react2.default.createElement(_DialogCell2.default.Button.Flat, {
            rootStyle: S.BT,
            key: '1Y',
            caption: '1Y',
            onClick: this._hZoomBy1Y
          })
        )
      );
    }
  }]);
  return ZoomDialog;
}(_react.Component), _class.defaultProps = {
  data: {}
}, _temp);
exports.default = ZoomDialog;
//# sourceMappingURL=ZoomDialog.js.map