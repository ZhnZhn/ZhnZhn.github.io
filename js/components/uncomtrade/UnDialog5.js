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
var TRADE_FLOW = [{
  caption: "Export Value",
  value: {
    rg: 2,
    measure: "TradeValue"
  }
}, {
  caption: "Export Weight or Quantity",
  value: {
    rg: 2,
    measure: "NetWeight"
  }
}, {
  caption: "Export Average Price",
  value: {
    rg: 2,
    measure: "avgPrice"
  }
}, {
  caption: "Import Value",
  value: {
    rg: 1,
    measure: "TradeValue"
  }
}, {
  caption: "Import Weight or Quantity",
  value: {
    rg: 1,
    measure: "NetWeight"
  }
}, {
  caption: "Import Average Price",
  value: {
    rg: 1,
    measure: "avgPrice"
  }
}];
var UnDialog5 = (_dec = Decor.dialog, _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(UnDialog5, _Component);

  function UnDialog5(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._handleSelectTradeFlow = function (tradeFlow) {
      _this.tradeFlow = tradeFlow;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var msg = [];

      var _this$groupItem$getVa = _this.groupItem.getValidation(),
          isValid1 = _this$groupItem$getVa.isValid,
          msg1 = _this$groupItem$getVa.msg;

      if (!isValid1) {
        msg = msg.concat(msg1);
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
      var _this$groupItem$getVa2 = _this.groupItem.getValues(),
          two = _this$groupItem$getVa2.one,
          three = _this$groupItem$getVa2.two;

      return _this.props.loadFn(_this.props, {
        one: _this.one,
        two: two,
        three: three,
        tradeFlow: _this.tradeFlow
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._handleMode = function (propName, value) {
      _this[propName] = value;
    };

    _this._refGroupItem = function (c) {
      return _this.groupItem = c;
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    _this._menuMore = crMenuMore((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      isShowOptions: true
    });
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState(), {
      isShowDate: false,
      isShowOptions: false
    });
    return _this;
  }

  var _proto = UnDialog5.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      if (this.props.isShow === nextProps.isShow) {
        return false;
      }
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        caption = _this$props.caption,
        isShow = _this$props.isShow,
        onShow = _this$props.onShow,
        onFront = _this$props.onFront,
        oneCaption = _this$props.oneCaption,
        oneURI = _this$props.oneURI,
        oneJsonProp = _this$props.oneJsonProp,
        twoCaption = _this$props.twoCaption,
        twoURI = _this$props.twoURI,
        twoJsonProp = _this$props.twoJsonProp,
        threeCaption = _this$props.threeCaption,
        msgOnNotSelected = _this$props.msgOnNotSelected,
        initFromDate = _this$props.initFromDate,
        initToDate = _this$props.initToDate,
        msgOnNotValidFormat = _this$props.msgOnNotValidFormat,
        onTestDate = _this$props.onTestDate,
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels,
        isShowDate = _this$state.isShowDate,
        isShowOptions = _this$state.isShowOptions,
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].SelectWithLoad, {
        isShow: isShow,
        isShowLabels: isShowLabels,
        uri: oneURI,
        jsonProp: oneJsonProp,
        caption: oneCaption,
        placeholder: "Default: All",
        onSelect: this._handleSelectOne
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].SelectOneTwo, {
        ref: this._refGroupItem,
        isShow: isShow,
        isShowLabels: isShowLabels,
        uri: twoURI,
        oneCaption: twoCaption,
        oneJsonProp: twoJsonProp,
        twoCaption: threeCaption,
        msgOnNotSelected: msgOnNotSelected
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ShowHide, {
        isShow: isShowDate,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].DatesFragment, {
          ref: this._refDates,
          isShowLabels: isShowLabels,
          initFromDate: initFromDate,
          initToDate: initToDate,
          msgOnNotValidFormat: msgOnNotValidFormat,
          onTestDate: onTestDate
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ShowHide, {
        isShow: isShowOptions,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowInputSelect, {
          isShowLabels: isShowLabels,
          caption: "Trade Flow",
          options: TRADE_FLOW,
          placeholder: "Default: Export Value",
          onSelect: this._handleSelectTradeFlow
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].ValidationMessages, {
        validationMessages: validationMessages
      })]
    });
  };

  return UnDialog5;
}(_react.Component), _temp)) || _class);
var _default = UnDialog5;
exports["default"] = _default;
//# sourceMappingURL=UnDialog5.js.map