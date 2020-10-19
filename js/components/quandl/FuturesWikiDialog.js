"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _dec, _class, _temp;

var Decor = _DialogCell["default"].Decor,
    crMenuMore = _DialogCell["default"].crMenuMore;
var typeOptions = [{
  caption: 'Continuous Contract #1',
  value: 1
}, {
  caption: 'Continuous Contract #2',
  value: 2
}, {
  caption: 'Continuous Contract #3',
  value: 3
}, {
  caption: 'Continuous Contract #4',
  value: 4
}, {
  caption: 'Continuous Contract #5',
  value: 5
}];
var FuturesWikiDialog = (_dec = Decor.dialog, _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(FuturesWikiDialog, _Component);

  function FuturesWikiDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this; //this.type = undefined

    _this._handleSelectType = function (type) {
      _this.type = type;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var _this$props = _this.props,
          msgOnNotSelected = _this$props.msgOnNotSelected,
          msgOnNotValidFormat = _this$props.msgOnNotValidFormat,
          isFd = _this$props.isFd;
      var msg = [];

      var _this$_refExchangeIte = _this._refExchangeItem.current.getValidation(),
          isValid1 = _this$_refExchangeIte.isValid,
          msg1 = _this$_refExchangeIte.msg;

      if (!isValid1) {
        msg = msg.concat(msg1);
      }

      if (!_this.type) {
        msg.push(msgOnNotSelected('Type'));
      }

      if (isFd && !_this._refFromDate.current.isValid()) {
        msg.push(msgOnNotValidFormat('From Date'));
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var _this$_refExchangeIte2 = _this._refExchangeItem.current.getValues(),
          exchange = _this$_refExchangeIte2.one,
          item = _this$_refExchangeIte2.two,
          fromDate = _this.props.isFd ? _this._refFromDate.current.getValue() : void 0;

      return _this.props.loadFn(_this.props, {
        exchange: exchange,
        item: item,
        type: _this.type,
        fromDate: fromDate
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._menuMore = crMenuMore((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: true
    });
    _this._refExchangeItem = /*#__PURE__*/(0, _react.createRef)();
    _this._refFromDate = /*#__PURE__*/(0, _react.createRef)();
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState());
    return _this;
  }

  var _proto = FuturesWikiDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        isShow = _this$props2.isShow,
        caption = _this$props2.caption,
        onShow = _this$props2.onShow,
        onFront = _this$props2.onFront,
        futuresURI = _this$props2.futuresURI,
        msgOnNotSelected = _this$props2.msgOnNotSelected,
        isFd = _this$props2.isFd,
        initFromDate = _this$props2.initFromDate,
        isYmdOrEmpty = _this$props2.isYmdOrEmpty,
        errNotYmdOrEmpty = _this$props2.errNotYmdOrEmpty,
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels,
        validationMessages = _this$state.validationMessages;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handleClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Toolbar, {
        isShow: isToolbar,
        buttons: this.toolbarButtons
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].SelectOneTwo, {
        ref: this._refExchangeItem,
        isShow: isShow,
        isShowLabels: isShowLabels,
        uri: futuresURI,
        oneCaption: "Exchange",
        oneOptionNames: "Exchanges",
        oneJsonProp: "futures",
        twoCaption: "Asset",
        msgOnNotSelected: msgOnNotSelected
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Type",
        options: typeOptions,
        onSelect: this._handleSelectType
      }), isFd && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowDate, {
        innerRef: this._refFromDate,
        isShowLabels: isShowLabels,
        labelTitle: "From Date:",
        initValue: initFromDate,
        errorMsg: errNotYmdOrEmpty,
        onTestDate: isYmdOrEmpty
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ValidationMessages, {
        validationMessages: validationMessages
      })]
    });
  };

  return FuturesWikiDialog;
}(_react.Component), _temp)) || _class);
var _default = FuturesWikiDialog;
exports["default"] = _default;
//# sourceMappingURL=FuturesWikiDialog.js.map