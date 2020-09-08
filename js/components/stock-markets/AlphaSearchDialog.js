"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _SearchAdapter = _interopRequireDefault(require("../../adapters/alpha/SearchAdapter"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _dec, _dec2, _class, _temp;

var Decor = _DialogCell["default"].Decor,
    crMenuMore = _DialogCell["default"].crMenuMore;
var C = {
  ERR_DESCR: 'API key from Alpha Vantage is required',
  ERR_CAPTION: "Without API Key"
};
var AlphaIntradayDialog = (_dec = Decor.withToolbar, _dec2 = Decor.withInitialState, _dec(_class = _dec2(_class = (_temp = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(AlphaIntradayDialog, _Component);

  function AlphaIntradayDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._crUrlOptions = function () {
      var _this$props = _this.props,
          getKey = _this$props.getKey,
          loadId = _this$props.loadId,
          onError = _this$props.onError;
      var apiKey = getKey(loadId);

      if (!apiKey) {
        onError(C.ERR_DESCR, C.ERR_CAPTION);
        return void 0;
      }

      return {
        apiKey: apiKey
      };
    };

    _this._handleClose = function () {
      _this.props.onClose();
    };

    _this._menuMore = crMenuMore((0, _assertThisInitialized2["default"])(_this), {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });
    _this.toolbarButtons = _this._createType2WithToolbar(props, {
      noDate: true
    });
    _this._searchApi = (0, _extends2["default"])({}, _SearchAdapter["default"], {
      crUrlOptions: _this._crUrlOptions,
      onError: _this.props.onError
    });
    _this.state = (0, _extends2["default"])({}, _this._isWithInitialState());
    return _this;
  }

  var _proto = AlphaIntradayDialog.prototype;

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
        onFront = _this$props2.onFront,
        _this$state = this.state,
        isToolbar = _this$state.isToolbar,
        isShowLabels = _this$state.isShowLabels;
    return /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].DraggableDialog, {
      isShow: isShow,
      caption: caption,
      menuModel: this._menuMore,
      onFront: onFront,
      onClose: this._handleClose
    }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].Toolbar, {
      isShow: isToolbar,
      buttons: this.toolbarButtons
    }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowInputSearch, {
      isShowLabels: isShowLabels,
      caption: "Token",
      searchApi: this._searchApi
    }));
  };

  return AlphaIntradayDialog;
}(_react.Component), _temp)) || _class) || _class);
var _default = AlphaIntradayDialog;
exports["default"] = _default;
//# sourceMappingURL=AlphaSearchDialog.js.map