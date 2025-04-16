"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _formatAllNumber = _interopRequireDefault(require("../../utils/formatAllNumber"));
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _SpanToken = require("../zhn/SpanToken");
var _DivCompareTo = _interopRequireDefault(require("./DivCompareTo"));
var _jsxRuntime = require("react/jsx-runtime");
const S_MODAL_POPUP = {
    ...(0, _styleFn.crAbsoluteTopLeftStyle)(30, 0),
    zIndex: 20,
    width: 'auto',
    backgroundColor: 'inherit',
    padding: '5px 10px 10px 10px',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
    cursor: 'auto'
  },
  S_ROW = {
    display: 'flex',
    justifyContent: 'space-between'
  },
  S_DATE = {
    paddingLeft: 16,
    whiteSpace: 'nowrap'
  };
const _isCompareTo = (isAdminMode, isDenyToChange) => {
  const _isAdminMode = (0, _isTypeFn.isFn)(isAdminMode) ? isAdminMode() : (0, _isTypeFn.isBool)(isAdminMode) ? isAdminMode : false;
  return _isAdminMode && !isDenyToChange;
};
const RowValueDate = _ref => {
  let {
    value,
    date
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROW,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanValue, {
      children: (0, _formatAllNumber.default)(value)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanDate, {
      style: S_DATE,
      children: date
    })]
  });
};
const ValueMovingModal = props => {
  const {
      isShow,
      updateDateTo,
      valueMoving,
      isAdminMode,
      onClose
    } = props,
    [msgDateTo, setMsgDateTo] = (0, _uiApi.useState)(''),
    _refInput = (0, _uiApi.useRef)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hEnterDate = (0, _uiApi.useCallback)(dateTo => {
      if ((0, _uiApi.isInputValid)(_refInput)) {
        setMsgDateTo(updateDateTo(dateTo) ? '' : `No data for ${dateTo}`);
      }
    }, []);
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(() => {
    if (isShow) {
      (0, _uiApi.focusRefElement)(_refInput);
      setMsgDateTo('');
    }
  }, [props]);
  const {
    value,
    date,
    valueTo,
    dateTo,
    isDenyToChange
  } = valueMoving;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPopup.default, {
    isShow: isShow,
    style: S_MODAL_POPUP,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(RowValueDate, {
      value: value,
      date: date
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RowValueDate, {
      value: valueTo,
      date: dateTo
    }), _isCompareTo(isAdminMode, isDenyToChange) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivCompareTo.default, {
      refEl: _refInput,
      initialValue: dateTo,
      msgErr: msgDateTo,
      onEnter: _hEnterDate
    })]
  });
};

/*
ModalValueMoving.propTypes = {
  valueMoving: PropTypes.shape({
    value: PropTypes.string,
    date: PropTypes.string,
    valueTo: PropTypes.string,
    dateTo: PropTypes.string,
    isDenyToChange: PropTypes.bool
  }),
  isAdminMode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  msgDateTo: PropTypes.string,
  updateDateTo: PropTypes.func,
  onClose: PropTypes.func
}
*/
var _default = exports.default = ValueMovingModal;
//# sourceMappingURL=ValueMovingModal.js.map