"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _MenuMore = _interopRequireDefault(require("../dialogs/MenuMore"));

var _Decorators = _interopRequireDefault(require("../dialogs/decorators/Decorators"));

var _dec, _class, _temp;

var yearOptions = [{
  caption: '2020',
  value: 2020
}, {
  caption: '2019',
  value: 2019
}, {
  caption: '2018',
  value: 2018
}, {
  caption: '2017',
  value: 2017
}, {
  caption: '2016',
  value: 2016
}, {
  caption: '2015',
  value: 2015
}, {
  caption: '2014',
  value: 2014
}, {
  caption: '2013',
  value: 2013
}, {
  caption: '2012',
  value: 2012
}];
var Futures3Dialog = (_dec = _Decorators["default"].dialog, _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(Futures3Dialog, _Component);

  function Futures3Dialog(props) {
    var _this;

    _this = _Component.call(this, props) || this; //this.year = undefined

    _this._handleSelectYear = function (year) {
      _this.year = year;
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

      var _this$_refItemMonth$c = _this._refItemMonth.current.getValidation(),
          isValid1 = _this$_refItemMonth$c.isValid,
          msg1 = _this$_refItemMonth$c.msg;

      if (!isValid1) {
        msg = msg.concat(msg1);
      }

      if (!_this.year) {
        msg.push(msgOnNotSelected('Year'));
      }

      if (isFd && !_this._refFromDate.current.isValid()) {
        msg.push(msgOnNotValidFormat('From Date'));
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var _this$_refItemMonth$c2 = _this._refItemMonth.current.getValues(),
          item = _this$_refItemMonth$c2.one,
          month = _this$_refItemMonth$c2.two,
          fromDate = _this.props.isFd ? _this._refFromDate.current.getValue() : void 0;

      return _this.props.loadFn(_this.props, {
        item: item,
        month: month,
        year: _this.year,
        fromDate: fromDate
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._menuMore = (0, _MenuMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: true
    });
    _this._refItemMonth = /*#__PURE__*/_react["default"].createRef();
    _this._refFromDate = /*#__PURE__*/_react["default"].createRef();
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState());
    return _this;
  }

  var _proto = Futures3Dialog.prototype;

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
    return /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: this._handleClose
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].Toolbar, {
      isShow: isToolbar,
      buttons: this.toolbarButtons
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].SelectOneTwo, {
      ref: this._refItemMonth,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: futuresURI,
      oneCaption: "Futures",
      oneOptionNames: "Futures",
      oneJsonProp: "futures",
      twoCaption: "Month",
      msgOnNotSelected: msgOnNotSelected
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Year",
      options: yearOptions,
      onSelect: this._handleSelectYear
    }), isFd && /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowDate, {
      innerRef: this._refFromDate,
      isShowLabels: isShowLabels,
      labelTitle: "From Date:",
      initValue: initFromDate,
      errorMsg: errNotYmdOrEmpty,
      onTestDate: isYmdOrEmpty
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].ValidationMessages, {
      validationMessages: validationMessages
    }));
  };

  return Futures3Dialog;
}(_react.Component), _temp)) || _class);
var _default = Futures3Dialog;
exports["default"] = _default;
//# sourceMappingURL=Futures3Dialog.js.map