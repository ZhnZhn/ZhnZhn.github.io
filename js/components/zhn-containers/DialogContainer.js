"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));
var _useStoreState = _interopRequireDefault(require("../hooks/useStoreState"));
var _compStore = require("../../flux/stores/compStore");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROOT = {
  zIndex: 1030,
  position: 'absolute',
  top: 70,
  left: 10
  //width: '98%'
};
const _findCompIndex = (arr, key) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].key === key) {
      return i;
    }
  }
  return;
};
const _doVisible = (arr, keyValue) => {
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
  return (0, _uiApi.isUndef)(index) ? void 0 : comps[index];
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
  return (0, _uiApi.safeMap)(compDialogs, Comp => {
    const key = Comp.key;
    return (0, _uiApi.cloneElement)(Comp, {
      key: key,
      isShow: hmIs[key],
      optionData: hmData[key],
      toTopLayer: () => _hToTopLayer(key),
      onClose: () => _hToggleDialog(key)
    });
  });
};
const fUpdateState = maxDialog => (msShowDialog, setState) => {
  if (msShowDialog) {
    setState(prevState => {
      const {
        key,
        Comp,
        data
      } = msShowDialog;
      if (Comp && !(0, _uiApi.isUndef)(_findCompIndex(prevState.compDialogs, key))) {
        return prevState;
      }
      _updateVisible(prevState, key, maxDialog);
      if (!Comp) {
        prevState.compDialogs = _doVisible(prevState.compDialogs, key);
      } else {
        prevState.compDialogs.push(Comp);
      }
      prevState.hmData[key] = data;
      return {
        ...prevState
      };
    });
  }
};
const DialogContainer = _ref2 => {
  let {
    maxDialog = 3
  } = _ref2;
  const _upateState = (0, _useRefInit.default)(() => fUpdateState(maxDialog)),
    [state, setState] = (0, _useStoreState.default)({
      hmIs: {},
      compDialogs: [],
      hmData: {},
      visibleDialogs: []
    }, _compStore.useMsShowDialog, _upateState),
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
          return {
            ...prevState
          };
        });
      }
    },
    _hToggleDialog = key => {
      if (hmIs[key]) {
        const _Comp = _findCompByKey(compDialogs, key);
        if (_Comp) {
          (0, _compStore.closeDialog)(_Comp);
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
        return {
          ...prevState
        };
      });
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_ROOT,
    children: _renderDialogs(state, _hToTopLayer, _hToggleDialog)
  });
};
var _default = exports.default = DialogContainer;
//# sourceMappingURL=DialogContainer.js.map