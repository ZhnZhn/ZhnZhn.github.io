"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _DateUtils = require("../../utils/DateUtils");

var _formatAllNumber = _interopRequireDefault(require("../../utils/formatAllNumber"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _SpanValue = _interopRequireDefault(require("../zhn-span/SpanValue"));

var _SpanDate = _interopRequireDefault(require("../zhn-span/SpanDate"));

var _DivCompareTo = _interopRequireDefault(require("./DivCompareTo"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const S_MODAL_POPUP = {
  position: 'absolute',
  top: 25,
  left: 0,
  zIndex: 20,
  width: 'auto',
  backgroundColor: 'inherit',
  padding: '5px 10px 10px 10px',
  border: '2px solid #1b2836',
  borderRadius: 5,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
  cursor: 'auto'
},
      S_ROW = {
  display: 'flex',
  justifyContent: 'space-between'
},
      S_DATE = {
  display: 'inline-block',
  paddingLeft: 16,
  whiteSpace: 'nowrap'
};

const _isCompareTo = (isAdminMode, isDenyToChange) => {
  const _isAdminMode = typeof isAdminMode == 'function' ? isAdminMode() : typeof isAdminMode == 'boolean' ? isAdminMode : false;

  return _isAdminMode && !isDenyToChange;
};

const RowValueDate = _ref => {
  let {
    value,
    date
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROW,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanValue.default, {
      value: (0, _formatAllNumber.default)(value)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanDate.default, {
      date: date,
      style: S_DATE
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
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hEnterDate = (0, _uiApi.useCallback)(dateTo => {
    if ((0, _DateUtils.isDmy)(dateTo)) {
      setMsgDateTo(updateDateTo(dateTo) ? '' : "No data for " + dateTo);
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
      ref: _refInput,
      initialValue: dateTo,
      msgErr: msgDateTo,
      onTest: _DateUtils.isDmy,
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


var _default = ValueMovingModal;
exports.default = _default;
//# sourceMappingURL=ValueMovingModal.js.map