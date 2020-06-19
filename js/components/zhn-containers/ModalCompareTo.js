"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _DivCompareTo = _interopRequireDefault(require("../items/DivCompareTo"));

var isDmy = _DateUtils["default"].isDmy;
var S = {
  ROOT: {
    position: 'absolute',
    top: 38,
    left: 6,
    zIndex: 10,
    width: 'auto',
    backgroundColor: 'inherit',
    border: '2px solid #1b2836',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 12,
    cursor: 'auto'
  }
};

var ModalCompareTo = function ModalCompareTo(_ref) {
  var isShow = _ref.isShow,
      onClose = _ref.onClose,
      onCompareTo = _ref.onCompareTo;

  var _refInput = (0, _react.useRef)(),
      _useState = (0, _react.useState)(''),
      msgErr = _useState[0],
      setMsgErr = _useState[1],
      _onEnterDateTo = (0, _react.useCallback)(function (dateTo) {
    if (isDmy(dateTo)) {
      var _r = onCompareTo(dateTo);

      if (_r !== 0) {
        setMsgErr("No " + _r + " data for " + dateTo);
      } else {
        setMsgErr('');
      }
    }
  }, []);

  (0, _react.useEffect)(function () {
    if (isShow && _refInput.current) {
      _refInput.current.focusInput();
    }
  }, [isShow]);
  return /*#__PURE__*/_react["default"].createElement(_ModalPopup["default"], {
    isShow: isShow,
    style: S.ROOT,
    onClose: onClose
  }, /*#__PURE__*/_react["default"].createElement(_DivCompareTo["default"], {
    ref: _refInput,
    msgErr: msgErr,
    onTest: isDmy,
    onEnter: _onEnterDateTo
  }));
};

var _default = ModalCompareTo;
exports["default"] = _default;
//# sourceMappingURL=ModalCompareTo.js.map