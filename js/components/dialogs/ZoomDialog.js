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
  }
};

var _isPeriodValid = function _isPeriodValid(from, to) {
  return _DateUtils2.default.dmyToUTC(from) <= _DateUtils2.default.dmyToUTC(to);
};
var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var ZoomDialog = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ZoomDialog, _Component);

  function ZoomDialog() {
    (0, _classCallCheck3.default)(this, ZoomDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ZoomDialog.__proto__ || Object.getPrototypeOf(ZoomDialog)).call(this));

    _this._hZoom = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          onClose = _this$props.onClose,
          _data$chart = data.chart,
          chart = _data$chart === undefined ? {} : _data$chart;

      if (_isFn(chart.zhZoomX) && _this._dates.getValidation().isValid) {
        var _this$_dates$getValue = _this._dates.getValues(),
            fromDate = _this$_dates$getValue.fromDate,
            toDate = _this$_dates$getValue.toDate;

        chart.zhZoomX({
          from: _DateUtils2.default.dmyToUTC(fromDate),
          to: _DateUtils2.default.dmyToUTC(toDate)
        });
      }
      onClose();
    };

    _this._refDates = function (c) {
      return _this._dates = c;
    };

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
          _ref = _isFn(chart.zhGetFromToDates) ? chart.zhGetFromToDates({
        format: _DateUtils2.default.formatTo
      }) : {},
          from = _ref.from,
          to = _ref.to,
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
          onTestDate: _DateUtils2.default.isDmy,
          onEnter: this._hZoom
        })
      );
    }
  }]);
  return ZoomDialog;
}(_react.Component), _class.defaultProps = {
  data: {}
}, _temp);
exports.default = ZoomDialog;
//# sourceMappingURL=ZoomDialog.js.map