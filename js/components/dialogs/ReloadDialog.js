"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _jsxRuntime = require("react/jsx-runtime");
const S_MODAL = {
    position: 'static',
    width: 350,
    height: 175,
    margin: '70px auto'
  },
  S_ROOT = {
    color: 'gray',
    padding: '8px 0 0 16px',
    lineHeight: 1.7,
    fontWeight: 'bold'
  },
  S_DATE = {
    color: '#80c040'
  },
  S_CLOSE = {
    color: '#232f3b'
  };
const ReloadDialog = _ref => {
  let {
    isShow,
    data,
    onClose
  } = _ref;
  const _hReload = (0, _uiApi.useCallback)(() => {
      document.cookie = "erc=1";
      window.location.reload(true);
    }, [])
    /*eslint-disable react-hooks/exhaustive-deps */,
    _commandButtons = (0, _uiApi.useMemo)(() => [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      caption: "Yes, Reload",
      isPrimary: true,
      onClick: _hReload
    }, "reload"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      style: S_CLOSE,
      caption: "No",
      onClick: onClose
    }, "no")], [onClose])
    /* _hReload */
    /*eslint-enable react-hooks/exhaustive-deps */,
    {
      buildDate = ''
    } = data || {};
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    style: S_MODAL,
    caption: "Reload Web App",
    isShow: isShow,
    commandButtons: _commandButtons,
    withoutClose: true,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_ROOT,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: "Browser has loaded ERC from a cache."
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: "Reload web app ERC to the new build?"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        style: S_DATE,
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
exports.default = _default;
//# sourceMappingURL=ReloadDialog.js.map