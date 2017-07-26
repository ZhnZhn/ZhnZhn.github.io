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

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DraggableDialog = require('../zhn-moleculs/DraggableDialog');

var _DraggableDialog2 = _interopRequireDefault(_DraggableDialog);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _SelectWithLoad = require('./SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _DatesFragment = require('../zhn-moleculs/DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _withValidationLoad = require('./decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformOptions = [{ caption: "NO EFFECT: z[t]=y[t]", value: "none" }, { caption: "ROW-ON-ROW CHANGE: z[t]=y[t]–y[t-1]", value: "diff" }, { caption: "ROW-ON-ROW % CHANGE: z[t]=(y[t]–y[t-1])/y[t-1]", value: "rdiff" }, { caption: "LATEST VALUE AS % INCREMENT: z[t]=(y[latest]–y[t])/y[t]", value: "rdiff_from" }, { caption: "SCALE SERIES TO START AT 100: z[t]=y[t]÷y[0]*100", value: "normalize" }];

var DialogType3 = (0, _withValidationLoad2.default)(_class = function (_Component) {
  (0, _inherits3.default)(DialogType3, _Component);

  function DialogType3(props) {
    (0, _classCallCheck3.default)(this, DialogType3);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogType3.__proto__ || Object.getPrototypeOf(DialogType3)).call(this, props));

    _this._handleClickInfo = function () {
      var _this$props = _this.props,
          descrUrl = _this$props.descrUrl,
          onClickInfo = _this$props.onClickInfo;

      onClickInfo({ descrUrl: descrUrl });
    };

    _this._handleClickTransform = function () {
      _this.setState(function (prevState) {
        return { isShowTransform: !prevState.isShowTransform };
      });
    };

    _this._handleSelectTransform = function (option) {
      _this.transform = option;
    };

    _this._handleSelectStock = function (stock) {
      _this.stock = stock;
    };

    _this._handleLoad = function (event) {
      event.target.focus();
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props$itemCapti = _this.props.itemCaption,
          itemCaption = _this$props$itemCapti === undefined ? 'Stock' : _this$props$itemCapti;

      var msg = [];
      if (!_this.stock) {
        msg.push(_this.props.msgOnNotSelected(itemCaption));
      }

      var _this$datesFragment$g = _this.datesFragment.getValidation(),
          isValid = _this$datesFragment$g.isValid,
          datesMsg = _this$datesFragment$g.datesMsg;

      if (!isValid) {
        msg = msg.concat(datesMsg);
      }
      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var _this$datesFragment$g2 = _this.datesFragment.getValues(),
          fromDate = _this$datesFragment$g2.fromDate,
          toDate = _this$datesFragment$g2.toDate;

      return _this.props.loadFn(_this.props, { stock: _this.stock, fromDate: fromDate, toDate: toDate, transform: _this.transform });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose(_this._createValidationMessages);
      _this.props.onClose();
    };

    _this.stock = undefined;
    _this.transform = undefined;
    _this.toolbarButtons = [];
    if (props.descrUrl) {
      _this.toolbarButtons.push({
        caption: 'I', onClick: _this._handleClickInfo
      });
    }
    if (props.isTransform) {
      _this.toolbarButtons.push({
        caption: 'T', onClick: _this._handleClickTransform
      });
    }
    _this._commandButtons = [_react2.default.createElement(_Button2.default.Load, { onClick: _this._handleLoad })];
    _this.state = {
      isShowTransform: false,
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(DialogType3, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props !== nextProps) {
        if (this.props.isShow === nextProps.isShow) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          caption = _props.caption,
          isShow = _props.isShow,
          onShow = _props.onShow,
          onFront = _props.onFront,
          optionURI = _props.optionURI,
          optionsJsonProp = _props.optionsJsonProp,
          _props$itemCaption = _props.itemCaption,
          itemCaption = _props$itemCaption === undefined ? 'Stock:' : _props$itemCaption,
          _props$optionNames = _props.optionNames,
          optionNames = _props$optionNames === undefined ? 'Stocks' : _props$optionNames,
          isWithInputStock = _props.isWithInputStock,
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          msgOnNotValidFormat = _props.msgOnNotValidFormat,
          onTestDate = _props.onTestDate,
          _state = this.state,
          isShowTransform = _state.isShowTransform,
          validationMessages = _state.validationMessages;


      return _react2.default.createElement(
        _DraggableDialog2.default,
        {
          caption: caption,
          isShow: isShow,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(_ToolbarButtonCircle2.default, {
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_SelectWithLoad2.default, {
          isShow: isShow,
          uri: optionURI,
          jsonProp: optionsJsonProp,
          caption: itemCaption,
          optionNames: optionNames,
          isWithInput: isWithInputStock,
          onSelect: this._handleSelectStock
        }),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowTransform },
          _react2.default.createElement(_RowInputSelect2.default, {
            caption: 'Transform:',
            options: transformOptions,
            onSelect: this._handleSelectTransform
          })
        ),
        _react2.default.createElement(_DatesFragment2.default, {
          ref: function ref(c) {
            return _this2.datesFragment = c;
          },
          initFromDate: initFromDate,
          initToDate: initToDate,
          msgOnNotValidFormat: msgOnNotValidFormat,
          onTestDate: onTestDate
        }),
        _react2.default.createElement(_ValidationMessages2.default, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return DialogType3;
}(_react.Component)) || _class;

process.env.NODE_ENV !== "production" ? DialogType3.propTypes = {
  isShow: _react.PropTypes.bool,
  caption: _react.PropTypes.string,
  itemCaption: _react.PropTypes.string,
  optionURI: _react.PropTypes.string,
  optionsJsonProp: _react.PropTypes.string,
  optionNames: _react.PropTypes.string,
  initFromDate: _react.PropTypes.string,
  initToDate: _react.PropTypes.string,
  msgOnNotValidFormat: _react.PropTypes.func,
  onTestDate: _react.PropTypes.func,
  onShow: _react.PropTypes.func,

  descrUrl: _react.PropTypes.string,
  isTransform: _react.PropTypes.bool,
  onClickInfo: _react.PropTypes.func,
  loadFn: _react.PropTypes.func
} : void 0;
exports.default = DialogType3;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DialogType3.js.map