'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _ZhDialog = require('../ZhDialog');

var _ZhDialog2 = _interopRequireDefault(_ZhDialog);

var _ZhSelect = require('../ZhSelect');

var _ZhSelect2 = _interopRequireDefault(_ZhSelect);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

var _QuandlCommodity = require('../../services/qe/QuandlCommodity');

var _QuandlCommodity2 = _interopRequireDefault(_QuandlCommodity);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var QuandlCommoditiesDialog = _react2.default.createClass(_extends({
  displayName: 'QuandlCommoditiesDialog'
}, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    this.type = null;
    this.commodity = null;
    return {
      optionTypes: _QuandlCommodity2.default.getCommodityTypes(),
      optionCommodities: [],
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
  _handlerSelectType: function _handlerSelectType(type) {
    if (type && type.value) {
      this.type = type;
      this.commodity = null;
      this.setState({ optionCommodities: _QuandlCommodity2.default.getCommodities(type.value) });
    } else {
      this.type = null;
      this.commodity = null;
    }
  },
  _handlerSelectCommodity: function _handlerSelectCommodity(commodity) {
    this.commodity = commodity;
  },
  _handlerLoad: function _handlerLoad(event) {
    event.target.focus();
    var validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
      var _datesFragment$getVal = this.datesFragment.getValues();

      var fromDate = _datesFragment$getVal.fromDate;
      var toDate = _datesFragment$getVal.toDate;

      var option = {
        value: this.commodity.value,
        type: this.type,
        commodity: this.commodity,
        fromDate: fromDate,
        toDate: toDate
      };
      this.props.onLoad(option);
    }
    this._updateValidationMessages(validationMessages);
  },
  _getValidationMessages: function _getValidationMessages() {
    var msgOnNotSelected = this.props.msgOnNotSelected;

    var msg = [];

    if (!this.type) {
      msg.push(msgOnNotSelected('Type'));
    }
    if (!this.commodity) {
      msg.push(msgOnNotSelected('Commodity'));
    }

    var _datesFragment$getVal2 = this.datesFragment.getValidation();

    var isValid = _datesFragment$getVal2.isValid;
    var datesMsg = _datesFragment$getVal2.datesMsg;

    if (!isValid) {
      msg = msg.concat(datesMsg);
    }

    msg.isValid = msg.length === 0 ? true : false;

    return msg;
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var isShow = _props.isShow;
    var onShow = _props.onShow;
    var onClose = _props.onClose;
    var initFromDate = _props.initFromDate;
    var initToDate = _props.initToDate;
    var msgOnNotValidFormat = _props.msgOnNotValidFormat;
    var onTestDate = _props.onTestDate;
    var _state = this.state;
    var optionTypes = _state.optionTypes;
    var optionCommodities = _state.optionCommodities;
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
        caption: 'Quandl Commodity Prices',
        isShow: isShow,
        commandButtons: _commandButtons,
        onShowChart: onShow,
        onClose: this._handlerClose
      },
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv, key: '1' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Type:'
        ),
        _react2.default.createElement(_ZhSelect2.default, {
          width: '250',
          onSelect: this._handlerSelectType,
          options: optionTypes
        })
      ),
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv, key: '2' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Commodity:'
        ),
        _react2.default.createElement(_ZhSelect2.default, {
          width: '250',
          onSelect: this._handlerSelectCommodity,
          options: optionCommodities
        })
      ),
      _react2.default.createElement(_DatesFragment2.default, {
        key: '3',
        ref: function ref(c) {
          return _this.datesFragment = c;
        },
        initFromDate: initFromDate,
        initToDate: initToDate,
        msgOnNotValidFormat: msgOnNotValidFormat,
        onTestDate: onTestDate
      }),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        key: '4',
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = QuandlCommoditiesDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\QuandlCommoditiesDialog.js.map