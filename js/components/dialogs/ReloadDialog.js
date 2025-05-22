"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _useCommandButtons = _interopRequireDefault(require("../zhn-moleculs/useCommandButtons"));
var _jsxRuntime = require("react/jsx-runtime");
const S_MODAL = {
    position: 'static',
    width: 350,
    height: 175,
    margin: '70px auto'
  },
  S_ROOT = {
    color: 'grey',
    padding: '8px 0 0 16px',
    lineHeight: 1.7,
    fontWeight: 'bold'
  },
  S_DATE = {
    color: '#80c040'
  };
const ReloadDialog = _ref => {
  let {
    isShow,
    data,
    onClose
  } = _ref;
  const _hReload = (0, _uiApi.useCallback)(() => {
      document.cookie = "erc=1";
      window.location.reload(!0);
    }, []),
    _commandButtons = (0, _useCommandButtons.default)(() => [["No", onClose], ["Yes, Reload", _hReload]]),
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
        children: `New build ${buildDate} is available.`
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
var _default = exports.default = ReloadDialog;
//# sourceMappingURL=ReloadDialog.js.map