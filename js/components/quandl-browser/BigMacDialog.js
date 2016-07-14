'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _WithToolbar = require('../dialogs/WithToolbar');

var _WithToolbar2 = _interopRequireDefault(_WithToolbar);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _SelectWithLoad = require('../dialogs/SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _RowInputSelect = require('../dialogs/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BigMacDialog = _react2.default.createClass(_extends({
  displayName: 'BigMacDialog'
}, _WithToolbar2.default, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.country = null;
    this.metric = null;

    this.toolbarButtons = this._createType2WithToolbar();

    return {
      isShowDate: true,
      optionMetrics: [{ caption: 'Local Price', value: 1 }, { caption: 'Dollar Exchange', value: 2 }, { caption: 'Dollar Price', value: 3 }, { caption: 'Dollar PPP', value: 4 }, { caption: 'Dollar Valuation', value: 5 }],

      validationMessages: []
    };
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }
    return true;
  },
  _handlerSelectCountry: function _handlerSelectCountry(country) {
    this.country = country;
  },
  _handlerSelectMetric: function _handlerSelectMetric(metric) {
    this.metric = metric;
  },
  _handlerLoad: function _handlerLoad() {
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var msg = [];
    if (!this.country) {
      msg.push(this.props.msgOnNotSelected('Country'));
    }

    var _datesFragment$getVal = this.datesFragment.getValidation();

    var isValid = _datesFragment$getVal.isValid;
    var datesMsg = _datesFragment$getVal.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }
    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  _createLoadOption: function _createLoadOption() {
    var _datesFragment$getVal2 = this.datesFragment.getValues();

    var fromDate = _datesFragment$getVal2.fromDate;
    var toDate = _datesFragment$getVal2.toDate;
    var _dataColumn = this.metric ? this.metric.value : 1;
    var _subtitle = this.metric ? this.metric.caption : this.state.optionMetrics[0].caption;
    var _props = this.props;
    var loadId = _props.loadId;
    var fnValue = _props.fnValue;

    return {
      value: fnValue(this.country.value),
      fromDate: fromDate,
      toDate: toDate,
      dataColumn: _dataColumn,
      itemCaption: this.country.caption,
      loadId: loadId,
      title: this.country.caption,
      subtitle: _subtitle
    };
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var isShow = _props2.isShow;
    var onShow = _props2.onShow;
    var countryURI = _props2.countryURI;
    var countryJsonProp = _props2.countryJsonProp;
    var initFromDate = _props2.initFromDate;
    var initToDate = _props2.initToDate;
    var msgOnNotValidFormat = _props2.msgOnNotValidFormat;
    var onTestDate = _props2.onTestDate;
    var _state = this.state;
    var isShowDate = _state.isShowDate;
    var optionMetrics = _state.optionMetrics;
    var validationMessages = _state.validationMessages;
    var _commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Load',
      onClick: this._handlerLoad
    })];

    return _react2.default.createElement(
      _ZhDialog2.default,
      {
        caption: 'Economist Big Mac Index',
        isShow: isShow,
        commandButtons: _commandButtons,
        onShowChart: onShow,
        onClose: this._handlerClose
      },
      _react2.default.createElement(_ToolbarButtonCircle2.default, {
        buttons: this.toolbarButtons
      }),
      _react2.default.createElement(_SelectWithLoad2.default, {
        isShow: isShow,
        uri: countryURI,
        jsonProp: countryJsonProp,
        caption: 'Country:',
        optionNames: 'Countries',
        onSelect: this._handlerSelectCountry
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Metric:',
        options: optionMetrics,
        onSelect: this._handlerSelectMetric
      }),
      _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isShowDate },
        _react2.default.createElement(_DatesFragment2.default, {
          ref: function ref(c) {
            return _this.datesFragment = c;
          },
          initFromDate: initFromDate,
          initToDate: initToDate,
          msgOnNotValidFormat: msgOnNotValidFormat,
          onTestDate: onTestDate
        })
      ),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = BigMacDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\BigMacDialog.js.map