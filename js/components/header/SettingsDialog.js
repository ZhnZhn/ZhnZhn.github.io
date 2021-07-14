"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _PaneApiKey = _interopRequireDefault(require("./PaneApiKey"));

var _PaneOptions = _interopRequireDefault(require("./PaneOptions"));

//import PropTypes from 'prop-types'
var S = {
  MODAL: {
    position: 'static',
    width: 380,
    height: 446,
    margin: '70px auto 0px'
  },
  TITLE_API: {
    width: 80
  },
  TITLE_OPTION: {
    width: 110
  },
  BT: {
    color: '#232f3b'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var SettingsDialog = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(SettingsDialog, _Component);

  function SettingsDialog() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._hClose = function () {
      _this.props.onClose();

      if (_this._modal && _isFn(_this._modal.focusPrev)) {
        _this._modal.focusPrev();
      }
    };

    _this._refModal = function (n) {
      return _this._modal = n;
    };

    return _this;
  }

  var _proto = SettingsDialog.prototype;

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      setQuandlKey: PropTypes.func,
      isAdminMode: PropTypes.func,
      isDrawDeltaExtrems: PropTypes.func
    }),
    onClose: PropTypes.func
  }
  */
  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        data = _this$props.data;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].ModalDialog, {
      ref: this._refModal,
      caption: "User Settings",
      style: S.MODAL,
      isWithButton: false,
      isShow: isShow,
      onClose: this._hClose,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp["default"].TabPane, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].Tab, {
          title: "ApiKeys",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaneApiKey["default"], {
            isShow: isShow,
            titleStyle: S.TITLE_API,
            btStyle: S.BT,
            data: data,
            onClose: this._hClose
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].Tab, {
          title: "Options",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaneOptions["default"], {
            titleStyle: S.TITLE_OPTION,
            btStyle: S.BT,
            data: data,
            onChangeTheme: _ComponentActions["default"].changeTheme,
            onClose: this._hClose
          })
        })]
      })
    });
  };

  return SettingsDialog;
}(_react.Component);

var _default = SettingsDialog;
exports["default"] = _default;
//# sourceMappingURL=SettingsDialog.js.map