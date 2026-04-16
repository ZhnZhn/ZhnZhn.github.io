"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _has = require("../has");
var _hotkeys = require("../hotkeys/hotkeys");
var _a11yFn = require("../a11yFn");
var _useStoreState = _interopRequireDefault(require("../hooks/useStoreState"));
var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _FlatButtonSvg = require("../zhn-m/FlatButtonSvg");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_HOT = "bt-hot",
  S_QUICK_MENU = {
    display: 'flex',
    gap: 3
  };
const _isIn = (arr, type) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].type === type) {
      return true;
    }
  }
  return false;
};
const _crBtProps = function (index, caption) {
  if (caption === void 0) {
    caption = '';
  }
  const _hotKey = _has.HAS_TOUCH_EVENTS ? '' : String(index + 1);
  return {
    hotKey: _hotKey || void 0,
    caption: _hotKey + caption.slice(0, 3),
    ...(0, _a11yFn.crBtAriaLabelProps)(`Open ${caption} dialog`)
  };
};
const _crHotBtItem = (conf, index, _ref) => {
  let {
    onShowDialog
  } = _ref;
  return /*#__PURE__*/(0, _react.createElement)(_FlatButton.default, {
    ..._crBtProps(index, conf.caption),
    key: conf.type,
    timeout: 0,
    className: CL_BT_HOT,
    onClick: (0, _uiApi.bindTo)(onShowDialog, conf.type)
  });
};
const _calcMaxButtons = maxButtons => {
  const _innerWidth = (0, _has.getWindowInnerWidth)() || 601;
  return _innerWidth > 600 ? maxButtons : _innerWidth > 500 ? 3 : _innerWidth > 360 ? 2 : 1;
};
const NUMBER_OF_MAX_BUTTONS = _calcMaxButtons(5);
const updateHotButtons = (msCloseDialog, setHotButtons) => {
  if (msCloseDialog) {
    setHotButtons(arr => {
      if (!_isIn(arr, msCloseDialog.type)) {
        const _index = arr.length % NUMBER_OF_MAX_BUTTONS;
        arr[_index] = msCloseDialog;
        return [...arr];
      }
      return arr;
    });
  }
};
const QuickMenu = _ref2 => {
  let {
    useMsCloseDialog,
    onShowDialog
  } = _ref2;
  const [hotButtons, setHotButtons] = (0, _useStoreState.default)([], useMsCloseDialog, updateHotButtons)
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hClean = (0, _uiApi.useCallback)(() => setHotButtons([]), []);
  // setHotButtons
  /*eslint-enable react-hooks/exhaustive-deps */
  return (0, _isTypeFn.isNotEmptyArr)(hotButtons) ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_QUICK_MENU,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: hotButtons,
      crItem: _crHotBtItem,
      onShowDialog: onShowDialog
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButtonSvg.FlatButtonDelete, {
      hotKey: _hotkeys.HK_CLEAR_QUICK_MENU,
      className: CL_BT_HOT,
      onClick: _hClean,
      ...(0, _a11yFn.crBtAriaLabelProps)('Clear quick menu')
    }, "BT_CLEAR")]
  }) : null;
};
var _default = exports.default = QuickMenu;
//# sourceMappingURL=QuickMenu.js.map