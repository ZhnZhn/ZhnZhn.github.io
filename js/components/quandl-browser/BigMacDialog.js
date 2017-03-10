'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DraggableDialog = require('../zhn-moleculs/DraggableDialog');

var _DraggableDialog2 = _interopRequireDefault(_DraggableDialog);

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

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _DatesFragment = require('../zhn-moleculs/DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BigMacDialog = _react2.default.createClass((0, _extends3.default)({
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

    var _datesFragment$getVal = this.datesFragment.getValidation(),
        isValid = _datesFragment$getVal.isValid,
        datesMsg = _datesFragment$getVal.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }
    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  _createLoadOption: function _createLoadOption() {
    var _datesFragment$getVal2 = this.datesFragment.getValues(),
        fromDate = _datesFragment$getVal2.fromDate,
        toDate = _datesFragment$getVal2.toDate,
        _dataColumn = this.metric ? this.metric.value : 1,
        _subtitle = this.metric ? this.metric.caption : this.state.optionMetrics[0].caption,
        _props = this.props,
        loadId = _props.loadId,
        fnValue = _props.fnValue;

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

    var _props2 = this.props,
        isShow = _props2.isShow,
        onShow = _props2.onShow,
        countryURI = _props2.countryURI,
        countryJsonProp = _props2.countryJsonProp,
        initFromDate = _props2.initFromDate,
        initToDate = _props2.initToDate,
        msgOnNotValidFormat = _props2.msgOnNotValidFormat,
        onTestDate = _props2.onTestDate,
        _state = this.state,
        isShowDate = _state.isShowDate,
        optionMetrics = _state.optionMetrics,
        validationMessages = _state.validationMessages,
        _commandButtons = [_react2.default.createElement(_ActionButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Load',
      onClick: this._handlerLoad
    })];


    return _react2.default.createElement(
      _DraggableDialog2.default,
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
      _react2.default.createElement(_ValidationMessages2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = BigMacDialog;
//# sourceMappingURL=BigMacDialog.js.map