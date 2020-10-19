"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _formatAllNumber = _interopRequireDefault(require("../../utils/formatAllNumber"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _SpanValue = _interopRequireDefault(require("../zhn-span/SpanValue"));

var _SpanDate = _interopRequireDefault(require("../zhn-span/SpanDate"));

var _DivCompareTo = _interopRequireDefault(require("./DivCompareTo"));

//import PropTypes from "prop-types";
var isDmy = _DateUtils["default"].isDmy;
var S = {
  ROOT: {
    position: 'absolute',
    top: 25,
    left: 0,
    zIndex: 10,
    width: 'auto',
    backgroundColor: 'inherit',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 10,
    border: '2px solid #1b2836',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
    cursor: 'auto'
  },
  ROW: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  DATE: {
    display: 'inline-block',
    paddingLeft: 16,
    whiteSpace: 'nowrap'
  }
};

var _isNotAdminMode = function _isNotAdminMode(isAdminMode, isDenyToChange) {
  var _isAdminMode = typeof isAdminMode == 'function' ? isAdminMode() : typeof isAdminMode == 'boolean' ? isAdminMode : false;

  return !_isAdminMode || isDenyToChange;
};

var RowValueDate = function RowValueDate(_ref) {
  var value = _ref.value,
      date = _ref.date;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S.ROW,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanValue["default"], {
      value: (0, _formatAllNumber["default"])(value)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanDate["default"], {
      date: date,
      style: S.DATE
    })]
  });
};

var ValueMovingModal = function ValueMovingModal(props) {
  var isShow = props.isShow,
      updateDateTo = props.updateDateTo,
      valueMoving = props.valueMoving,
      isAdminMode = props.isAdminMode,
      onClose = props.onClose,
      _useState = (0, _react.useState)(''),
      msgDateTo = _useState[0],
      setMsgDateTo = _useState[1],
      _refInput = (0, _react.useRef)(),
      _hEnterDate = (0, _react.useCallback)(function (dateTo) {
    if (isDmy(dateTo)) {
      if (updateDateTo(dateTo)) {
        setMsgDateTo('');
      } else {
        setMsgDateTo("No data for " + dateTo);
      }
    }
  }, []);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(function () {
    if (isShow) {
      if (_refInput.current) {
        _refInput.current.focus();
      }

      if (msgDateTo) {
        setMsgDateTo('');
      }
    }
  }, [props]);
  var value = valueMoving.value,
      date = valueMoving.date,
      valueTo = valueMoving.valueTo,
      dateTo = valueMoving.dateTo,
      isDenyToChange = valueMoving.isDenyToChange;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalPopup["default"], {
    isShow: isShow,
    style: S.ROOT,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(RowValueDate, {
      value: value,
      date: date
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RowValueDate, {
      value: valueTo,
      date: dateTo
    }), !_isNotAdminMode(isAdminMode, isDenyToChange) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivCompareTo["default"], {
      ref: _refInput,
      initialValue: dateTo,
      msgErr: msgDateTo,
      onTest: isDmy,
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
exports["default"] = _default;
//# sourceMappingURL=ValueMovingModal.js.map