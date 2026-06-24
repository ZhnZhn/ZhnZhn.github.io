"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _useHasNotEqual = _interopRequireDefault(require("../hooks/useHasNotEqual"));
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _fnFetch = require("../../utils/fnFetch");
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
const _crState = (isLoading, isLoadFailed, errMsg, aboutJson) => ({
  isLoading,
  isLoadFailed,
  errMsg,
  aboutJson
});
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
    [{
      isLoading,
      isLoadFailed,
      errMsg,
      aboutJson
    }, setState] = (0, _uiApi.useState)(() => _crState(!1, !1, '', INITIAL_DESCR)),
    [_isNextProps] = (0, _useHasNotEqual.default)(props),
    [_isNextDescrUrl, isDescrUrlCurrentValue] = (0, _useHasNotEqual.default)(descrUrl),
    _isLoadDescr = isShow && descrUrl && (_isNextDescrUrl || !isLoading && (aboutJson === INITIAL_DESCR || _isNextProps && isLoadFailed));
  (0, _uiApi.useEffect)(() => {
    if (_isLoadDescr) {
      setState(prevState => ({
        ...prevState,
        isLoading: !0
      }));
      if ((0, _isTypeFn.isIncludeToken)(descrUrl, 'data')) {
        (0, _fnFetch.fetchJson)({
          uri: descrUrl.replace('.html', '.json'),
          onFetch: function (_temp) {
            let {
              json
            } = _temp === void 0 ? {} : _temp;
            return isDescrUrlCurrentValue(descrUrl) && setState(_crState(!1, !1, '', json || EMPTY_DESCR));
          },
          onCatch: function (_temp2) {
            let {
              error
            } = _temp2 === void 0 ? {} : _temp2;
            return isDescrUrlCurrentValue(descrUrl) && setState(_crState(!1, !0, error.message, EMPTY_DESCR));
          }
        });
      }
    }
  }, [_isLoadDescr, descrUrl, isDescrUrlCurrentValue]);
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