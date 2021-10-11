"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _has = _interopRequireDefault(require("../has"));

var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

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

const CleanButton = ({
  is,
  onClick
}) => is ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
  timeout: 0,
  style: S_BT_CL,
  caption: "CL",
  title: "Clean Hot Bar",
  onClick: onClick
}, "BT_CLEAN") : null;

const _crBtProps = (index, caption = '') => {
  const _accessKey = _has.default.touch ? '' : String(index + 1);

  return {
    accessKey: _accessKey || void 0,
    caption: _accessKey + caption.substring(0, 3),
    title: caption
  };
};

const _crHotBtItem = (conf, index, {
  style,
  onShowDialog
}) => /*#__PURE__*/(0, _react.createElement)(_FlatButton.default, { ..._crBtProps(index, conf.caption),
  key: conf.type,
  timeout: 0,
  style: style,
  onClick: onShowDialog.bind(null, conf.type)
});

const HotBar = ({
  maxButtons = 5,
  btStyle,
  store,
  closeDialogAction,
  onShowDialog
}) => {
  const _refMaxBt = (0, _react.useRef)(_calcMaxButtons(maxButtons)),
        [hotButtons, setHotButtons] = (0, _react.useState)([]),
        _hClean = (0, _react.useCallback)(() => setHotButtons([]), []);

  (0, _useListen.default)(store, (actionType, conf) => {
    if (actionType === closeDialogAction) {
      setHotButtons(arr => {
        if (!_isIn(arr, conf.type)) {
          const _index = arr.length % _refMaxBt.current;

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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(CleanButton, {
      is: hotButtons.length !== 0,
      onClick: _hClean
    })]
  });
};

var _default = HotBar;
exports.default = _default;
//# sourceMappingURL=HotBar.js.map