"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _jsxRuntime = require("react/jsx-runtime");

const S_ROOT = {
  zIndex: 1030,
  position: 'absolute',
  top: 70,
  left: 10 //width: '98%'

};

const _isUndef = value => typeof value === 'undefined';

const _findCompIndex = (arr, key) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].key === key) {
      return i;
    }
  }

  return;
};

const _doVisible = function (arr, keyValue) {
  const _index = _findCompIndex(arr, keyValue) || 0;

  return [...arr.slice(0, _index), ...arr.slice(_index + 1), arr[_index]];
};

const _updateVisible = (state, key, maxDialog) => {
  const {
    hmIs,
    visibleDialogs
  } = state,
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

const _findCompByKey = (comps, key) => {
  const index = _findCompIndex(comps, key);

  return _isUndef(index) ? void 0 : comps[index];
};

const _filterArrByKey = (arr, key) => {
  arr.splice(arr.indexOf(key), 1);
};

const _renderDialogs = (_ref, _hToTopLayer, _hToggleDialog) => {
  let {
    hmIs,
    compDialogs,
    hmData
  } = _ref;
  return compDialogs.map(Comp => {
    const key = Comp.key;
    return /*#__PURE__*/(0, _react.cloneElement)(Comp, {
      key: key,
      isShow: hmIs[key],
      optionData: hmData[key],
      onFront: () => _hToTopLayer(key),
      onClose: () => _hToggleDialog(key)
    });
  });
};

const NOOP = () => {};

const DialogContainer = _ref2 => {
  let {
    maxDialog = 3,
    showAction,
    onCloseDialog = NOOP
  } = _ref2;

  const [state, setState] = (0, _react.useState)({
    hmIs: {},
    compDialogs: [],
    hmData: {},
    visibleDialogs: []
  }),
        {
    hmIs,
    compDialogs,
    visibleDialogs
  } = state,
        _hToTopLayer = key => {
    if (visibleDialogs[visibleDialogs.length - 1] !== key) {
      setState(prevState => {
        prevState.compDialogs = _doVisible(prevState.compDialogs, key);
        const visibleDialogs = prevState.visibleDialogs;

        _filterArrByKey(visibleDialogs, key);

        visibleDialogs.push(key);
        return { ...prevState
        };
      });
    }
  },
        _hToggleDialog = key => {
    if (hmIs[key]) {
      const _Comp = _findCompByKey(compDialogs, key);

      if (_Comp) {
        onCloseDialog(_Comp);
      }
    }

    setState(prevState => {
      const {
        hmIs
      } = prevState;
      hmIs[key] = !hmIs[key];

      if (!hmIs[key]) {
        _filterArrByKey(prevState.visibleDialogs, key);
      }

      return { ...prevState
      };
    });
  };

  (0, _useListen.default)((actionType, option) => {
    if (actionType === showAction) {
      setState(prevState => {
        const {
          key,
          Comp,
          data
        } = option;

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
        return { ...prevState
        };
      });
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_ROOT,
    children: _renderDialogs(state, _hToTopLayer, _hToggleDialog)
  });
};

var _default = DialogContainer;
exports.default = _default;
//# sourceMappingURL=DialogContainer.js.map