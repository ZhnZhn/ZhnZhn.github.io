"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("./Button"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var S = {
  MODAL: {
    position: 'static',
    width: 350,
    height: 175,
    margin: '70px auto'
  },
  ROOT: {
    color: 'gray',
    paddingTop: 8,
    paddingLeft: 16,
    lineHeight: 1.7,
    fontWeight: 'bold'
  },
  DATE: {
    color: '#80c040'
  },
  CLOSE: {
    color: '#232f3b'
  }
};

var ReloadDialog =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ReloadDialog, _Component);

  function ReloadDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hReload = function () {
      document.cookie = "erc=1";
      window.location.reload(true);
    };

    _this._commandButtons = [_react["default"].createElement(_Button["default"].Flat, {
      key: "reload",
      caption: "Yes, Reload",
      isPrimary: true,
      onClick: _this._hReload
    }), _react["default"].createElement(_Button["default"].Flat, {
      key: "no",
      rootStyle: S.CLOSE,
      caption: "No",
      onClick: props.onClose
    })];
    return _this;
  }

  var _proto = ReloadDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        onClose = _this$props.onClose,
        data = _this$props.data,
        _data$buildDate = data.buildDate,
        buildDate = _data$buildDate === void 0 ? '' : _data$buildDate;
    return _react["default"].createElement(_ModalDialog["default"], {
      style: S.MODAL,
      caption: "Reload Web App",
      isShow: isShow,
      commandButtons: this._commandButtons,
      withoutClose: true,
      onClose: onClose
    }, _react["default"].createElement("div", {
      style: S.ROOT
    }, _react["default"].createElement("p", null, "Browser has loaded ERC from a cache."), _react["default"].createElement("p", null, "Reload web app ERC to the new build?"), _react["default"].createElement("p", {
      style: S.DATE
    }, "New build " + buildDate + " is available.")));
  };

  return ReloadDialog;
}(_react.Component);

var _default = ReloadDialog;
exports["default"] = _default;
//# sourceMappingURL=ReloadDialog.js.map