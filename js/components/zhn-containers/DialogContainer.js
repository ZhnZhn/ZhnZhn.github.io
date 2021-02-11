"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var S = {
  ROOT: {
    zIndex: 1030,
    position: 'absolute',
    top: 70,
    left: 10,
    width: '98%'
  }
};

var _isUndef = function _isUndef(value) {
  return typeof value === 'undefined';
};

var _findCompIndex = function _findCompIndex(arr, key) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].key === key) {
      return i;
    }
  }

  return;
};

var _doVisible = function _doVisible(arr, keyValue) {
  var _index = _findCompIndex(arr, keyValue) || 0;

  return [].concat(arr.slice(0, _index), arr.slice(_index + 1), [arr[_index]]);
};

var _updateVisible = function _updateVisible(state, key, maxDialog) {
  var hmIs = state.hmIs,
      visibleDialogs = state.visibleDialogs,
      _keyIndex = visibleDialogs.indexOf(key);

  if (_keyIndex !== -1) {
    visibleDialogs.splice(_keyIndex, 1);
  }

  visibleDialogs.push(key);
  hmIs[key] = true;

  if (visibleDialogs.length > maxDialog) {
    hmIs[visibleDialogs[0]] = false;
    visibleDialogs.splice(0, 1);
  }
};

var _findCompByKey = function _findCompByKey(comps, key) {
  var index = _findCompIndex(comps, key);

  return _isUndef(index) ? void 0 : comps[index];
};

var _filterArrByKey = function _filterArrByKey(arr, key) {
  arr.splice(arr.indexOf(key), 1);
};

var _renderDialogs = function _renderDialogs(_ref, _hToTopLayer, _hToggleDialog) {
  var hmIs = _ref.hmIs,
      compDialogs = _ref.compDialogs,
      hmData = _ref.hmData;
  return compDialogs.map(function (Comp) {
    var key = Comp.key;
    return /*#__PURE__*/(0, _react.cloneElement)(Comp, {
      key: key,
      isShow: hmIs[key],
      optionData: hmData[key],
      onFront: function onFront() {
        return _hToTopLayer(key);
      },
      onClose: function onClose() {
        return _hToggleDialog(key);
      }
    });
  });
};

var NOOP = function NOOP() {};

var DialogContainer = function DialogContainer(_ref2) {
  var _ref2$maxDialog = _ref2.maxDialog,
      maxDialog = _ref2$maxDialog === void 0 ? 3 : _ref2$maxDialog,
      store = _ref2.store,
      showAction = _ref2.showAction,
      _ref2$onCloseDialog = _ref2.onCloseDialog,
      onCloseDialog = _ref2$onCloseDialog === void 0 ? NOOP : _ref2$onCloseDialog;

  var _useState = (0, _react.useState)({
    hmIs: {},
    compDialogs: [],
    hmData: {},
    visibleDialogs: []
  }),
      state = _useState[0],
      setState = _useState[1],
      hmIs = state.hmIs,
      compDialogs = state.compDialogs,
      visibleDialogs = state.visibleDialogs,
      _hToTopLayer = function _hToTopLayer(key) {
    if (visibleDialogs[visibleDialogs.length - 1] !== key) {
      setState(function (prevState) {
        prevState.compDialogs = _doVisible(prevState.compDialogs, key);
        var visibleDialogs = prevState.visibleDialogs;

        _filterArrByKey(visibleDialogs, key);

        visibleDialogs.push(key);
        return (0, _extends2["default"])({}, prevState);
      });
    }
  },
      _hToggleDialog = function _hToggleDialog(key) {
    if (hmIs[key]) {
      var _Comp = _findCompByKey(compDialogs, key);

      if (_Comp) {
        onCloseDialog(_Comp);
      }
    }

    setState(function (prevState) {
      var hmIs = prevState.hmIs;
      hmIs[key] = !hmIs[key];

      if (!hmIs[key]) {
        _filterArrByKey(prevState.visibleDialogs, key);
      }

      return (0, _extends2["default"])({}, prevState);
    });
  };

  (0, _useListen["default"])(store, function (actionType, option) {
    if (actionType === showAction) {
      setState(function (prevState) {
        var key = option.key,
            Comp = option.Comp,
            data = option.data;

        if (Comp && !_isUndef(_findCompIndex(prevState.compDialogs, key))) {
          return prevState;
        }

        _updateVisible(prevState, key, maxDialog);

        if (!Comp) {
          prevState.compDialogs = _doVisible(prevState.compDialogs, key);
        } else {
          prevState.compDialogs.push(Comp);
        }

        prevState.hmData[key] = data;
        return (0, _extends2["default"])({}, prevState);
      });
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S.ROOT,
    children: _renderDialogs(state, _hToTopLayer, _hToggleDialog)
  });
};

var _default = DialogContainer;
exports["default"] = _default;
//# sourceMappingURL=DialogContainer.js.map