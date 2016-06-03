'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _WithLoadOptions = require('../dialogs/WithLoadOptions');

var _WithLoadOptions2 = _interopRequireDefault(_WithLoadOptions);

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

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var FuturesDialog = _react2.default.createClass(_extends({}, _WithValidation2.default, _WithLoadOptions2.default, {

  displayName: 'QuandlFuturesChinaDceDialog',
  getInitialState: function getInitialState() {
    this.code = null;
    this.OPTIONS_STATE_PROP = 'optionCodes';
    var _isLoading = this.props.optionURI ? true : false;
    return {
      isLoading: _isLoading,
      isLoadingFailed: false,
      optionCodes: [],
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
  componentDidMount: function componentDidMount() {
    this._handlerWithLoadOptions(this.OPTIONS_STATE_PROP);
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.state.isLoadingFailed && this.props.optionURI && this.props.isShow) {
        this._handlerWithLoadOptions(this.OPTIONS_STATE_PROP);
      }
    }
  },
  componetWillUnmount: function componetWillUnmount() {
    this._unmountWithLoadOptions();
  },
  _handlerLoadOptions: function _handlerLoadOptions() {
    this._handlerWithLoadOptions(this.OPTIONS_STATE_PROP);
  },
  _handlerSelectCode: function _handlerSelectCode(code) {
    this.code = code;
  },
  _handlerLoad: function _handlerLoad(event) {
    event.target.focus();
    var validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
      var dataColumn = this.props.dataColumn;

      var option = {
        value: this.code.value,
        code: this.code,
        dataColumn: dataColumn
      };
      this.props.onLoad(option);
    }
    this._updateValidationMessages(validationMessages);
  },
  _getValidationMessages: function _getValidationMessages() {
    var msgOnNotSelected = this.props.msgOnNotSelected;
    var msg = [];

    if (!this.code) {
      msg.push(msgOnNotSelected('Code'));
    }

    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  render: function render() {
    var _props = this.props;
    var isShow = _props.isShow;
    var caption = _props.caption;
    var onShow = _props.onShow;
    var onClose = _props.onClose;
    var _state = this.state;
    var isLoading = _state.isLoading;
    var isLoadingFailed = _state.isLoadingFailed;
    var optionCodes = _state.optionCodes;
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
        caption: caption,
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
          'Code:'
        ),
        _react2.default.createElement(_ZhSelect2.default, {
          width: '250',
          isLoading: isLoading,
          isLoadingFailed: isLoadingFailed,
          onLoadOption: this._handlerLoadOptions,
          options: optionCodes,
          optionNames: 'Codes',
          onSelect: this._handlerSelectCode
        })
      ),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        key: '3',
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = FuturesDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\FuturesDialog.js.map