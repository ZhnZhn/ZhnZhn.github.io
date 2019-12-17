"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _MenuMore = _interopRequireDefault(require("./MenuMore"));

var _Decorators = _interopRequireDefault(require("./decorators/Decorators"));

var _dec, _dec2, _class, _temp;

var ERR_MSG = 'Empty or Id format is not valid';

var _testId = function _testId(value) {
  if (typeof value !== 'string' || !value) {
    return false;
  } else if (value.split('/').length !== 3) {
    return false;
  }

  return true;
};

var DialogQuery = (_dec = _Decorators["default"].withToolbar, _dec2 = _Decorators["default"].withLoad, _dec(_class = _dec2(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(DialogQuery, _Component);

  function DialogQuery(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._handleLoad = function () {
      if (_this._idInput && _this._idInput.isValid()) {
        var _this$props = _this.props,
            onLoad = _this$props.onLoad,
            loadFn = _this$props.loadFn;
        onLoad(loadFn(_this.props, {
          one: {
            value: _this._idInput.getValue(),
            caption: "seriaId"
          }
        }));
      }
    };

    _this._refIdInput = function (c) {
      return _this._idInput = c;
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    _this._menuMore = (0, _MenuMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    var noDate = props.noDate;
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: noDate
    });
    _this._commandButtons = _this._crCommandsWithLoad((0, _assertThisInitialized2["default"])(_this));
    _this.state = {
      isToolbar: true,
      isShowLabels: true,
      isShowDate: true
    };
    return _this;
  }

  var _proto = DialogQuery.prototype;

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
        caption = _this$props2.caption,
        isShow = _this$props2.isShow,
        onShow = _this$props2.onShow,
        onFront = _this$props2.onFront,
        onClose = _this$props2.onClose,
        oneCaption = _this$props2.oneCaption,
        onePlaceholder = _this$props2.onePlaceholder,
        noDate = _this$props2.noDate,
        initFromDate = _this$props2.initFromDate,
        initToDate = _this$props2.initToDate,
        msgOnNotValidFormat = _this$props2.msgOnNotValidFormat,
        onTestDate = _this$props2.onTestDate,
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels,
        isShowDate = _this$state.isShowDate;
    return _react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      menuModel: this._menuMore,
      caption: caption,
      commandButtons: this._commandButtons,
      onShowChart: onShow,
      onFront: onFront,
      onClose: onClose
    }, _react["default"].createElement(_DialogCell["default"].Toolbar, {
      isShow: isToolbar,
      buttons: this.toolbarButtons
    }), _react["default"].createElement(_DialogCell["default"].RowPattern, {
      ref: this._refIdInput,
      isShow: isShow,
      isShowLabels: isShowLabels,
      placeholder: onePlaceholder,
      caption: oneCaption,
      onTest: _testId,
      errorMsg: ERR_MSG
    }), !noDate && _react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowDate
    }, _react["default"].createElement(_DialogCell["default"].DatesFragment, {
      ref: this._refDates,
      isShowLabels: isShowLabels,
      initFromDate: initFromDate,
      initToDate: initToDate,
      msgOnNotValidFormat: msgOnNotValidFormat,
      onTestDate: onTestDate
    })));
  };

  return DialogQuery;
}(_react.Component), _temp)) || _class) || _class);
var _default = DialogQuery;
exports["default"] = _default;
//# sourceMappingURL=DialogQuery.js.map