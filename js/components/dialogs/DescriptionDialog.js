"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useLoadJson = require("./useLoadJson");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _Spinner = require("../zhn/Spinner");
var _AboutView = _interopRequireDefault(require("./AboutView"));
var _jsxRuntime = require("react/jsx-runtime");
const EMPTY_DESCR = {
    descr: 'Description empty'
  },
  INITIAL_DESCR = {},
  S_DIALOG = {
    top: 54,
    left: 20,
    width: 'auto',
    maxWidth: '89%',
    marginLeft: 0
  };
const _getAboutJson = aboutJson => (0, _isTypeFn.isObj)(aboutJson) ? aboutJson : EMPTY_DESCR;
const DescriptionDialog = (0, _memoIsShow.default)(props => {
  const {
      isShow,
      data,
      onClose
    } = props,
    {
      descrUrl
    } = data || {},
    [isLoading, isLoadFailed, errMsg, aboutJson] = (0, _useLoadJson.useLoadJson)(INITIAL_DESCR, isShow, (0, _isTypeFn.isIncludeToken)(descrUrl, 'data') ? descrUrl : void 0);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    caption: "About Data Source",
    isShow: isShow,
    style: S_DIALOG,
    onClose: onClose,
    children: isLoading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.SpinnerLoading, {}) : isLoadFailed ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.LoadFailedMsg, {
      errMsg: errMsg
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_AboutView.default, {
      aboutJson: _getAboutJson(aboutJson)
    })
  });
});
var _default = exports.default = DescriptionDialog;
//# sourceMappingURL=DescriptionDialog.js.map