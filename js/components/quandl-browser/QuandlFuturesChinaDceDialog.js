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

var _QuandlChinaDceFuture = require('../../services/qe/QuandlChinaDceFuture');

var _QuandlChinaDceFuture2 = _interopRequireDefault(_QuandlChinaDceFuture);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var QuandlFuturesChinaDceDialog = _react2.default.createClass(_extends({
  displayName: 'QuandlFuturesChinaDceDialog'
}, _WithValidation2.default, {
  getInitialState: function getInitialState() {
    return {
      optionCodes: _QuandlChinaDceFuture2.default.getTickets(),
      code: null,
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
  _handlerSelectCode: function _handlerSelectCode(code) {
    this.state.code = code;
  },
  _handlerLoad: function _handlerLoad(event) {
    event.target.focus();
    var validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
      var option = {
        value: this.state.code.value,
        code: this.state.code
      };
      this.props.onLoad(option);
    }
    this._updateValidationMessages(validationMessages);
  },
  _getValidationMessages: function _getValidationMessages() {
    var validationMessages = [];
    if (!this.state.code) {
      validationMessages.push("Code is Required to Select");
    }
    validationMessages.isValid = validationMessages.length === 0 ? true : false;
    return validationMessages;
  },
  render: function render() {
    var commandButtons = [_react2.default.createElement(_ToolBarButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Load',
      onClick: this._handlerLoad
    })];

    var _props = this.props;
    var isShow = _props.isShow;
    var onShow = _props.onShow;
    var onClose = _props.onClose;


    return _react2.default.createElement(
      _ZhDialog2.default,
      {
        caption: 'Futures China DCE',
        isShow: isShow,
        commandButtons: commandButtons,
        onShowChart: onShow,
        onClose: this._handlerClose
      },
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv, key: '1' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Code:'
        ),
        _react2.default.createElement(_ZhSelect2.default, {
          ref: 'selectStock',
          width: '250',
          onSelect: this._handlerSelectCode,
          options: this.state.optionCodes
        })
      ),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        key: '3',
        validationMessages: this.state.validationMessages
      })
    );
  }
}));

exports.default = QuandlFuturesChinaDceDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\QuandlFuturesChinaDceDialog.js.map