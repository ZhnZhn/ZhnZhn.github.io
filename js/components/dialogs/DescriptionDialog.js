"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useHasNotEqual = _interopRequireDefault(require("../hooks/useHasNotEqual"));
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _fnFetch = require("../../utils/fnFetch");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _DivHtml = _interopRequireDefault(require("../zhn/DivHtml"));
var _Spinner = require("../zhn/Spinner");
var _jsxRuntime = require("react/jsx-runtime");
const EMPTY_DESCR = '<p class="descr__part">Description empty</p>',
  INITIAL_DESCR = '',
  S_DIALOG = {
    top: 54,
    left: 20,
    width: 'auto',
    maxWidth: '89%',
    marginLeft: 0
  },
  S_DIV = {
    padding: 16
  };
const _crState = (isLoading, isLoadFailed, errMsg, descrHtml) => ({
  isLoading,
  isLoadFailed,
  errMsg,
  descrHtml
});
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
      descrHtml
    }, setState] = (0, _uiApi.useState)(() => _crState(!1, !1, '', INITIAL_DESCR)),
    [_isNextProps] = (0, _useHasNotEqual.default)(props),
    [_isNextDescrUrl, isDescrUrlCurrentValue] = (0, _useHasNotEqual.default)(descrUrl),
    _isLoadDescr = isShow && descrUrl && (_isNextDescrUrl || !isLoading && (descrHtml === INITIAL_DESCR || _isNextProps && isLoadFailed));
  (0, _uiApi.useEffect)(() => {
    if (_isLoadDescr) {
      setState(prevState => ({
        ...prevState,
        isLoading: !0
      }));
      (0, _fnFetch.fetchTxt)({
        uri: descrUrl,
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
  }, [_isLoadDescr, descrUrl, isDescrUrlCurrentValue]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    caption: "About Data Source",
    isShow: isShow,
    style: S_DIALOG,
    onClose: onClose,
    children: isLoading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.SpinnerLoading, {}) : isLoadFailed ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.LoadFailedMsg, {
      errMsg: errMsg
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivHtml.default, {
      style: S_DIV,
      str: descrHtml
    })
  });
});
var _default = exports.default = DescriptionDialog;
//# sourceMappingURL=DescriptionDialog.js.map