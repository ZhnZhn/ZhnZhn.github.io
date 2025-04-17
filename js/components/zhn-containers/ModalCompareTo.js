"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _dateFn = require("../../utils/dateFn");
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useFocus = require("../hooks/useFocus");
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _DivCompareTo = _interopRequireDefault(require("../items/DivCompareTo"));
var _jsxRuntime = require("react/jsx-runtime");
const S_MODAL_POPUP = {
  ...(0, _styleFn.crAbsoluteTopLeftStyle)(38, 6),
  zIndex: 20,
  padding: '5px 10px 12px 10px'
};
const ModalCompareTo = _ref => {
  let {
    isShow,
    onCompareTo,
    onClose
  } = _ref;
  const _refInput = (0, _useFocus.useRefFocusIf)(isShow),
    [msgErr, setMsgErr] = (0, _uiApi.useState)(''),
    _onEnterDateTo = (0, _uiApi.useCallback)(dateTo => {
      if ((0, _dateFn.isDmy)(dateTo)) {
        const _r = onCompareTo(dateTo),
          _msgErr = _r !== 0 ? `No ${_r} data for ${dateTo}` : '';
        setMsgErr(_msgErr);
      }
    }, [onCompareTo]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    isShow: isShow,
    style: S_MODAL_POPUP,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivCompareTo.default, {
      refEl: _refInput,
      msgErr: msgErr,
      onTest: _dateFn.isDmy,
      onEnter: _onEnterDateTo
    })
  });
};
var _default = exports.default = ModalCompareTo;
//# sourceMappingURL=ModalCompareTo.js.map