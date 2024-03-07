"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useBool = require("../hooks/useBool");
var _dateFn = require("../../utils/dateFn");
var _DirectionType = require("../../constants/DirectionType");
var _Button = _interopRequireDefault(require("../zhn/Button"));
var _SvgMove = require("../zhn/SvgMove");
var _SpanToken = require("../zhn/SpanToken");
var _SpanDate = _interopRequireDefault(require("../zhn-span/SpanDate"));
var _ValueMovingModal = _interopRequireDefault(require("./ValueMovingModal"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const CL_BT = 'bt';
const S_ROOT = {
    position: 'relative',
    display: 'inline-block',
    marginLeft: 10
  },
  S_SPAN = {
    marginLeft: 5,
    fontWeight: 'bold'
  },
  S_W5 = {
    display: 'inline-block',
    width: 5
  },
  S_DATE = {
    padding: '4px 5px 2px 5px'
  },
  S_UP = {
    color: '#4caf50'
  },
  S_DOWN = {
    color: '#f44336'
  },
  S_EQUAL = {
    color: '#2f7ed8'
  };
const _hmDirection = {
  DF: [null],
  [_DirectionType.DT_DOWN]: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMove.SvgDown, {}), S_DOWN],
  [_DirectionType.DT_UP]: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMove.SvgUp, {}), S_UP],
  [_DirectionType.DT_EQUAL]: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMove.SvgEqual, {}), S_EQUAL]
};
const _getDirection = direction => _hmDirection[direction] || _hmDirection.DF;
const DF_VALUE_MOVING = {
  value: 0,
  delta: 0,
  percent: 0,
  direction: _DirectionType.DT_EQUAL,
  date: ''
};
const ValueMovingBadge = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
    isAdminMode,
    initialVm = DF_VALUE_MOVING,
    crValueMoving
  } = _ref;
  const [vm, setVm] = (0, _uiApi.useState)(initialVm),
    [isShowModal, _toggleModal, _closeModal] = (0, _useBool.useToggleFalse)(),
    _date = (0, _uiApi.useMemo)(() => (0, _dateFn.getDateFromVm)(initialVm), [initialVm])
    /*eslint-disable react-hooks/exhaustive-deps */,
    _updateDateTo = (0, _uiApi.useMemo)(() => dateTo => {
      const _vm = crValueMoving(vm, dateTo);
      return _vm ? (setVm(_vm), _vm) : void 0;
    }, [vm]);
  //crValueMoving
  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _uiApi.useImperativeHandle)(ref, () => ({
    _updateDateTo
  }), [_updateDateTo]);
  const {
      value,
      delta,
      percent,
      direction
    } = vm,
    [_svgDirection, _dStyle] = _getDirection(direction),
    _spanStyle = {
      ...S_SPAN,
      ..._dStyle
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    style: S_ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanValue, {
      children: value
    }), _svgDirection, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _spanStyle,
      children: percent
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _spanStyle,
      children: delta
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_W5
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      className: CL_BT,
      onClick: _toggleModal,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanDate.default, {
        style: S_DATE,
        date: _date
      })
    }), _svgDirection && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValueMovingModal.default, {
      isShow: isShowModal,
      isAdminMode: isAdminMode,
      valueMoving: vm,
      updateDateTo: _updateDateTo,
      onClose: _closeModal
    })]
  });
});

/*
ValueMovingBadge.propTypes = {
  valueMoving: PropTypes.shape({
    value: PropTypes.number,
    delta: PropTypes.number,
    percent: PropTypes.number,
    direction: PropTypes.oneOf(
      'up',
      'down',
      'equal',
      'empty'
    ),
    date: PropTypes.string,
    valueTo: ?PropTypes.number,
    dateTo: ?PropTypes.string
  }),
  isAdminMode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  crValueMoving: PropTypes.func,
}
*/
var _default = exports.default = ValueMovingBadge;
//# sourceMappingURL=ValueMovingBadge.js.map