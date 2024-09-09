"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));
var _useStoreState = _interopRequireDefault(require("../hooks/useStoreState"));
var _compStore = require("../../flux/stores/compStore");
var _DialogContainerFn = require("./DialogContainerFn");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROOT = {
  zIndex: 1030,
  position: 'absolute',
  top: 70,
  left: 10
};
const fUpdateState = maxDialog => (msShowDialog, setState, _ref) => {
  let {
    hmIs,
    compDialogs
  } = _ref;
  const _hToTopLayer = key => {
      setState(prevState => {
        const visibleDialogs = prevState.visibleDialogs;
        if (visibleDialogs[visibleDialogs.length - 1] !== key) {
          prevState.compDialogs = (0, _DialogContainerFn.doVisible)(prevState.compDialogs, key);
          (0, _DialogContainerFn.filterArrByKey)(visibleDialogs, key);
          visibleDialogs.push(key);
          return {
            ...prevState
          };
        } else {
          return prevState;
        }
      });
    },
    _hToggleDialog = key => {
      if (hmIs[key]) {
        const _compIndex = (0, _DialogContainerFn.findCompIndex)(compDialogs, key);
        if (_compIndex > -1) {
          (0, _compStore.closeDialog)(compDialogs[_compIndex]);
        }
      }
      setState(prevState => {
        const {
          hmIs
        } = prevState;
        hmIs[key] = !hmIs[key];
        if (!hmIs[key]) {
          (0, _DialogContainerFn.filterArrByKey)(prevState.visibleDialogs, key);
        }
        return {
          ...prevState
        };
      });
    };
  if (msShowDialog) {
    setState(prevState => {
      const {
          key,
          Comp,
          data
        } = msShowDialog,
        {
          compDialogs
        } = prevState;
      if (Comp && (0, _DialogContainerFn.findCompIndex)(compDialogs, key) > -1) {
        return prevState;
      }
      (0, _DialogContainerFn.updateVisible)(prevState.hmIs, prevState.visibleDialogs, key, maxDialog);
      if (!Comp) {
        prevState.compDialogs = (0, _DialogContainerFn.doVisible)(compDialogs, key);
      } else {
        compDialogs.push(Comp);
      }
      if (!prevState.compProps[key]) {
        prevState.compProps[key] = {
          toTopLayer: () => _hToTopLayer(key),
          onClose: () => _hToggleDialog(key)
        };
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
    {
      hmIs,
      hmData,
      compProps,
      compDialogs
    } = (0, _useStoreState.default)(() => ({
      hmIs: {},
      hmData: {},
      compProps: {},
      compDialogs: [],
      visibleDialogs: []
    }), _compStore.useMsShowDialog, _upateState)[0];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_ROOT,
    children: (0, _uiApi.safeMap)(compDialogs, Comp => {
      const key = Comp.key;
      return (0, _uiApi.cloneElement)(Comp, {
        isShow: hmIs[key],
        optionData: hmData[key],
        ...compProps[key]
      });
    })
  });
};
var _default = exports.default = DialogContainer;
//# sourceMappingURL=DialogContainer.js.map