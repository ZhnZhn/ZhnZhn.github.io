"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useFocus = _interopRequireDefault(require("../hooks/useFocus"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _DivCompareTo = _interopRequireDefault(require("../items/DivCompareTo"));

var _jsxRuntime = require("react/jsx-runtime");

const {
  isDmy
} = _DateUtils.default;
const S_MODAL_POPUP = {
  position: 'absolute',
  top: 38,
  left: 6,
  zIndex: 20,
  width: 'auto',
  padding: '5px 10px 12px 10px',
  backgroundColor: 'inherit',
  border: '2px solid #1b2836',
  borderRadius: 5,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
  cursor: 'auto'
};

const ModalCompareTo = _ref => {
  let {
    isShow,
    onCompareTo,
    onClose
  } = _ref;

  const _refInput = (0, _useFocus.default)(isShow),
        [msgErr, setMsgErr] = (0, _react.useState)(''),
        _onEnterDateTo = (0, _react.useCallback)(dateTo => {
    if (isDmy(dateTo)) {
      const _r = onCompareTo(dateTo),
            _msgErr = _r !== 0 ? "No " + _r + " data for " + dateTo : '';

      setMsgErr(_msgErr);
    }
  }, [onCompareTo]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    isShow: isShow,
    style: S_MODAL_POPUP,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivCompareTo.default, {
      ref: _refInput,
      msgErr: msgErr,
      onTest: isDmy,
      onEnter: _onEnterDateTo
    })
  });
};

var _default = ModalCompareTo;
exports.default = _default;
//# sourceMappingURL=ModalCompareTo.js.map