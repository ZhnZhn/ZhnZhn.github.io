"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _has = _interopRequireDefault(require("../has"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var S = {
  ROOT: {
    display: 'inline-block'
  },
  BT_D: {
    color: '#c0c0c0'
  },
  BT_CL: {
    color: '#f44336'
  }
};

var _isIn = function _isIn(arr, type) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].type === type) {
      return true;
    }
  }

  return false;
};

var _calcMaxButtons = function _calcMaxButtons(maxButtons) {
  switch (_has["default"].strWidth) {
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

var CleanButton = function CleanButton(_ref) {
  var is = _ref.is,
      onClick = _ref.onClick;
  return is ? /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], {
    key: "BT_CLEAN",
    timeout: 0,
    style: S.BT_CL,
    caption: "CL",
    title: "Clean Hot Bar",
    onClick: onClick
  }) : null;
};

var _crBtProps = function _crBtProps(index, caption) {
  if (caption === void 0) {
    caption = '';
  }

  var _accessKey = _has["default"].touch ? '' : String(index + 1);

  return {
    accessKey: _accessKey || void 0,
    caption: _accessKey + caption.substring(0, 3),
    title: caption
  };
};

var _renderHotButtons = function _renderHotButtons(hotButtons, onShowDialog) {
  return hotButtons.map(function (conf, index) {
    var type = conf.type,
        caption = conf.caption;
    return /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], (0, _extends2["default"])({}, _crBtProps(index, caption), {
      key: type,
      timeout: 0,
      style: S.BT_D,
      onClick: onShowDialog.bind(null, type)
    }));
  });
};

var HotBar = function HotBar(_ref2) {
  var _ref2$maxButtons = _ref2.maxButtons,
      maxButtons = _ref2$maxButtons === void 0 ? 5 : _ref2$maxButtons,
      store = _ref2.store,
      closeDialogAction = _ref2.closeDialogAction,
      onShowDialog = _ref2.onShowDialog;

  var _refMaxBt = (0, _react.useRef)(_calcMaxButtons(maxButtons)),
      _useState = (0, _react.useState)([]),
      hotButtons = _useState[0],
      setHotButtons = _useState[1],
      _hClean = (0, _react.useCallback)(function () {
    return setHotButtons([]);
  }, []);

  (0, _useListen["default"])(store, function (actionType, conf) {
    if (actionType === closeDialogAction) {
      setHotButtons(function (arr) {
        if (!_isIn(arr, conf.type)) {
          var _index = arr.length % _refMaxBt.current;

          arr[_index] = conf;
          return [].concat(arr);
        }

        return arr;
      });
    }
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: S.ROOT
  }, _renderHotButtons(hotButtons, onShowDialog), /*#__PURE__*/_react["default"].createElement(CleanButton, {
    is: hotButtons.length !== 0,
    onClick: _hClean
  }));
};

var _default = HotBar;
exports["default"] = _default;
//# sourceMappingURL=HotBar.js.map