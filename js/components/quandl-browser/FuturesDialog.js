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

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _RowInputSelect = require('../dialogs/RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _DatesFragment = require('../DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FuturesDialog = _react2.default.createClass(_extends({}, _WithValidation2.default, _WithLoadOptions2.default, {

  displayName: 'FuturesDialog',
  getInitialState: function getInitialState() {
    this.code = null;
    this.OPTIONS_STATE_PROP = 'optionCodes';
    this.toolbarButtons = [{ caption: 'I', onClick: this._handlerClickInfo }];
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
  _handlerClickInfo: function _handlerClickInfo() {
    var _props = this.props;
    var descrUrl = _props.descrUrl;
    var onClickInfo = _props.onClickInfo;

    onClickInfo({ descrUrl: descrUrl });
  },
  _handlerLoadOptions: function _handlerLoadOptions() {
    this._handlerWithLoadOptions(this.OPTIONS_STATE_PROP);
  },
  _handlerSelectCode: function _handlerSelectCode(code) {
    this.code = code;
  },
  _handlerLoad: function _handlerLoad(event) {
    event.target.focus();
    this._handlerWithValidationLoad(this._createValidationMessages(), this._createLoadOption);
  },
  _createValidationMessages: function _createValidationMessages() {
    var msgOnNotSelected = this.props.msgOnNotSelected;
    var msg = [];

    if (!this.code) {
      msg.push(msgOnNotSelected('Code'));
    }

    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  _createLoadOption: function _createLoadOption() {
    var _props2 = this.props;
    var dataColumn = _props2.dataColumn;
    var loadId = _props2.loadId;

    return {
      value: this.code.value,
      code: this.code,
      dataColumn: dataColumn,
      loadId: loadId
    };
  },
  _handlerClose: function _handlerClose() {
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },
  render: function render() {
    var _props3 = this.props;
    var isShow = _props3.isShow;
    var caption = _props3.caption;
    var onShow = _props3.onShow;
    var onClose = _props3.onClose;
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
      _react2.default.createElement(_ToolbarButtonCircle2.default, {
        buttons: this.toolbarButtons
      }),
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Code:',
        isLoading: isLoading,
        isLoadingFailed: isLoadingFailed,
        options: optionCodes,
        optionNames: 'Codes',
        onLoadOption: this._handlerLoadOptions,
        onSelect: this._handlerSelectCode
      }),
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = FuturesDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\FuturesDialog.js.map