"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _DirectionType = require("../../constants/DirectionType");
var _isTypeFn = require("../../utils/isTypeFn");
var _dateFn = require("../../utils/dateFn");
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useBool = require("../hooks/useBool");
var _Button = _interopRequireDefault(require("../zhn/Button"));
var _SpanToken = require("../zhn/SpanToken");
var _ValueMovingModal = _interopRequireDefault(require("./ValueMovingModal"));
var _Item = require("./Item.Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROOT = {
    position: 'relative',
    display: 'inline-block',
    marginLeft: 10
  },
  S_DATE = {
    padding: '4px 5px 2px 5px'
  },
  S_UP = (0, _styleFn.crColorStyle)('#4caf50'),
  S_DOWN = (0, _styleFn.crColorStyle)('#f44336'),
  S_EQUAL = (0, _styleFn.crColorStyle)('#2f7ed8');
const _hmDirection = {
  DF: [null],
  [_DirectionType.DT_DOWN]: ["-", S_DOWN],
  [_DirectionType.DT_UP]: ["+", S_UP],
  [_DirectionType.DT_EQUAL]: ["", S_EQUAL]
};
const _getDirection = direction => _hmDirection[direction] || _hmDirection.DF;
const DF_VALUE_MOVING = {
  value: 0,
  delta: 0,
  percent: 0,
  direction: _DirectionType.DT_EQUAL,
  date: ''
};
const ValueMovingBadge = _ref => {
  let {
    refEl,
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

  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    _updateDateTo
  }), [_updateDateTo]);
  const {
      value,
      delta,
      percent,
      direction
    } = vm,
    [_strMove, _moveStyle] = _getDirection(direction),
    _percentToken = (0, _isTypeFn.isStr)(_strMove) ? `${_strMove}${percent}` : percent;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    style: S_ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanValue, {
      children: value
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanGap, {
      width: 10
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanMove, {
      style: _moveStyle,
      children: _percentToken
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanGap, {
      width: 8
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanMove, {
      style: _moveStyle,
      children: delta
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanGap, {
      width: 8
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      className: _Item.CL_VM_BADGE_BT,
      onClick: _toggleModal,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanDate, {
        style: S_DATE,
        children: _date
      })
    }), (0, _isTypeFn.isStr)(_strMove) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValueMovingModal.default, {
      isShow: isShowModal,
      isAdminMode: isAdminMode,
      valueMoving: vm,
      updateDateTo: _updateDateTo,
      onClose: _closeModal
    })]
  });
};

/*
ValueMovingBadge.propTypes = {
  refEl: PropTypes.ref,
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