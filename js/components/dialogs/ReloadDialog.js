"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

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

var ReloadDialog = function ReloadDialog(_ref) {
  var isShow = _ref.isShow,
      data = _ref.data,
      onClose = _ref.onClose;

  var _hReload = (0, _react.useCallback)(function () {
    document.cookie = "erc=1";
    window.location.reload(true);
  }, []),
      _commandButtons = (0, _react.useMemo)(function () {
    return [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button["default"].Flat, {
      caption: "Yes, Reload",
      isPrimary: true,
      onClick: _hReload
    }, "reload"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button["default"].Flat, {
      rootStyle: S.CLOSE,
      caption: "No",
      onClick: onClose
    }, "no")];
  }, [onClose]),
      _ref2 = data || {},
      _ref2$buildDate = _ref2.buildDate,
      buildDate = _ref2$buildDate === void 0 ? '' : _ref2$buildDate;
  /*eslint-disable react-hooks/exhaustive-deps */


  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog["default"], {
    style: S.MODAL,
    caption: "Reload Web App",
    isShow: isShow,
    commandButtons: _commandButtons,
    withoutClose: true,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.ROOT,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: "Browser has loaded ERC from a cache."
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: "Reload web app ERC to the new build?"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        style: S.DATE,
        children: "New build " + buildDate + " is available."
      })]
    })
  });
};
/*
ReloadDialog.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    buildDate: PropTypes.string
  }),
  onClose: PropTypes.func
}
*/


var _default = ReloadDialog;
exports["default"] = _default;
//# sourceMappingURL=ReloadDialog.js.map