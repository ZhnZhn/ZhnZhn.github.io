"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _has = _interopRequireDefault(require("../has"));

var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _react = require("react");

var _jsxRuntime = require("react/jsx-runtime");

const S_ROOT = {
  display: 'inline-block'
},
      S_BT_CL = {
  color: '#f44336'
};

const _isIn = (arr, type) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].type === type) {
      return true;
    }
  }

  return false;
};

const _calcMaxButtons = maxButtons => {
  switch (_has.default.strWidth) {
    case '"W600"':
      return 3;

    case '"W500"':
      return 2;

    case '"W360"':
      return 1;

    default:
      return maxButtons;
  }
};

const _crBtProps = function (index, caption) {
  if (caption === void 0) {
    caption = '';
  }

  const _hotKey = _has.default.touch ? '' : String(index + 1);

  return {
    hotKey: _hotKey || void 0,
    caption: _hotKey + caption.substring(0, 3),
    title: caption
  };
};

const _crHotBtItem = (conf, index, _ref) => {
  let {
    style,
    onShowDialog
  } = _ref;
  return /*#__PURE__*/(0, _react.createElement)(_FlatButton.default, { ..._crBtProps(index, conf.caption),
    key: conf.type,
    timeout: 0,
    style: style,
    onClick: onShowDialog.bind(null, conf.type)
  });
};

const HotBar = _ref2 => {
  let {
    maxButtons = 5,
    btStyle,
    closeDialogAction,
    onShowDialog
  } = _ref2;

  const _maxNumberOfBts = (0, _useRefInit.default)(() => _calcMaxButtons(maxButtons)),
        [hotButtons, setHotButtons] = (0, _uiApi.useState)([]),
        _hClean = (0, _uiApi.useCallback)(() => setHotButtons([]), []);

  (0, _useListen.default)((actionType, conf) => {
    if (actionType === closeDialogAction) {
      setHotButtons(arr => {
        if (!_isIn(arr, conf.type)) {
          const _index = arr.length % _maxNumberOfBts;

          arr[_index] = conf;
          return [...arr];
        }

        return arr;
      });
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: hotButtons,
      crItem: _crHotBtItem,
      style: btStyle,
      onShowDialog: onShowDialog
    }), hotButtons.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      timeout: 0,
      style: S_BT_CL,
      caption: "CL",
      title: "Clean Hot Bar",
      onClick: _hClean
    }, "BT_CLEAN")]
  });
};

var _default = HotBar;
exports.default = _default;
//# sourceMappingURL=HotBar.js.map