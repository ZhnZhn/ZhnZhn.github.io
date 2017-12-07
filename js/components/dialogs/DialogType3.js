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

var _dec, _dec2, _class;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('./DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _Decorators = require('./decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF_TIMEOUT = 4000;

var transformOptions = [{ caption: "NO EFFECT: z[t]=y[t]", value: "none" }, { caption: "ROW-ON-ROW CHANGE: z[t]=y[t]–y[t-1]", value: "diff" }, { caption: "ROW-ON-ROW % CHANGE: z[t]=(y[t]–y[t-1])/y[t-1]", value: "rdiff" }, { caption: "LATEST VALUE AS % INCREMENT: z[t]=(y[latest]–y[t])/y[t]", value: "rdiff_from" }, { caption: "SCALE SERIES TO START AT 100: z[t]=y[t]÷y[0]*100", value: "normalize" }];

var DialogType3 = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec(_class = _dec2(_class = function (_Component) {
  (0, _inherits3.default)(DialogType3, _Component);

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
    itemCaption: PropTypes.string,
    optionURI: PropTypes.string,
    optionsJsonProp: PropTypes.string,
    optionNames: PropTypes.string,
    initFromDate: PropTypes.string,
    initToDate: PropTypes.string,
    msgOnNotValidFormat: PropTypes.func,
    onTestDate: PropTypes.func,
    onShow: PropTypes.func,
      descrUrl: PropTypes.string,
    isTransform: PropTypes.bool,
    onClickInfo: PropTypes.func,
    loadFn: PropTypes.func
  }
  */

  function DialogType3(props) {
    (0, _classCallCheck3.default)(this, DialogType3);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogType3.__proto__ || Object.getPrototypeOf(DialogType3)).call(this, props));

    _this._handleClickTransform = function () {
      _this.setState(function (prevState) {
        return { isShowTransform: !prevState.isShowTransform };
      });
    };

    _this._handleSelectTransform = function (option) {
      _this.transform = option;
    };

    _this._clearLoaded = function (stock) {
      if (_this.isLoaded && _this.stock === stock) {
        _this.isLoaded = false;
      }
    };

    _this._handleSelectStock = function (stock) {
      if (stock && _this.stock === stock && !_this.isLoaded) {
        _this._handleLoad();
        _this.isLoaded = true;
        setTimeout(_this._clearLoaded, DF_TIMEOUT, stock);
      } else {
        _this.stock = stock;
        _this.isLoaded = false;
      }
    };

    _this._handleLoad = function () {
      //event.target.focus();
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          msgOnNotSelected = _this$props.msgOnNotSelected,
          _this$props$itemCapti = _this$props.itemCaption,
          itemCaption = _this$props$itemCapti === undefined ? 'Stock' : _this$props$itemCapti;

      var msg = [];

      if (!_this.stock) {
        msg.push(msgOnNotSelected(itemCaption));
      }

      if (_this.datesFragment) {
        var _this$datesFragment$g = _this.datesFragment.getValidation(),
            isValid = _this$datesFragment$g.isValid,
            datesMsg = _this$datesFragment$g.datesMsg;

        if (!isValid) {
          msg = msg.concat(datesMsg);
        }
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var _ref = _this.datesFragment ? _this.datesFragment.getValues() : {},
          fromDate = _ref.fromDate,
          toDate = _ref.toDate;

      return _this.props.loadFn(_this.props, {
        stock: _this.stock,
        fromDate: fromDate, toDate: toDate,
        transform: _this.transform
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this.stock = undefined;
    _this.transform = undefined;
    _this.isLoaded = false;

    var noDate = props.noDate,
        isTransform = props.isTransform;

    _this.toolbarButtons = _this._createType2WithToolbar(props, { noDate: noDate });
    if (isTransform) {
      _this.toolbarButtons.push({
        caption: 'T', onClick: _this._handleClickTransform
      });
    }
    _this._commandButtons = [_react2.default.createElement(_DialogCell2.default.Button.Load, { onClick: _this._handleLoad })];
    _this.state = {
      isShowLabels: true,
      isShowDate: true,
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
          itemCaption = _props$itemCaption === undefined ? 'Stock' : _props$itemCaption,
          _props$optionNames = _props.optionNames,
          optionNames = _props$optionNames === undefined ? 'Stocks' : _props$optionNames,
          isWithInputStock = _props.isWithInputStock,
          noDate = _props.noDate,
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          msgOnNotValidFormat = _props.msgOnNotValidFormat,
          onTestDate = _props.onTestDate,
          _state = this.state,
          isShowLabels = _state.isShowLabels,
          isShowTransform = _state.isShowTransform,
          isShowDate = _state.isShowDate,
          validationMessages = _state.validationMessages;


      return _react2.default.createElement(
        _DialogCell2.default.DraggableDialog,
        {
          isShow: isShow,
          caption: caption,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(_DialogCell2.default.ToolbarButtonCircle, {
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: optionURI,
          jsonProp: optionsJsonProp,
          caption: itemCaption,
          optionNames: optionNames,
          isWithInput: isWithInputStock,
          onSelect: this._handleSelectStock
        }),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowTransform },
          _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
            isShowLabels: isShowLabels,
            caption: 'Transform',
            options: transformOptions,
            onSelect: this._handleSelectTransform
          })
        ),
        !noDate && _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowDate },
          _react2.default.createElement(_DialogCell2.default.DatesFragment, {
            ref: function ref(c) {
              return _this2.datesFragment = c;
            },
            isShowLabels: isShowLabels,
            initFromDate: initFromDate,
            initToDate: initToDate,
            msgOnNotValidFormat: msgOnNotValidFormat,
            onTestDate: onTestDate
          })
        ),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return DialogType3;
}(_react.Component)) || _class) || _class);
exports.default = DialogType3;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\DialogType3.js.map