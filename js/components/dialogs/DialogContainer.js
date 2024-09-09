"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useStoreState = _interopRequireDefault(require("../hooks/useStoreState"));
var _compStore = require("../../flux/stores/compStore");
var _ModalDialogContainer = _interopRequireDefault(require("../zhn-containers/ModalDialogContainer"));
var _RouterModalDialog = require("./RouterModalDialog");
var _jsxRuntime = require("react/jsx-runtime");
const _setTypeTo = (prevState, type, option) => {
  prevState.shows[type] = true;
  prevState.data[type] = option;
  prevState.isShow = true;
  prevState.currentDialog = type;
  return {
    ...prevState
  };
};
const _onMdOption = (mdOption, setState, state) => {
  if (mdOption) {
    const type = mdOption.modalDialogType;
    (0, _RouterModalDialog.getModalDialog)(state.inits[type] ? void 0 : type).then(Comp => setState(prevState => {
      if (Comp) {
        prevState.dialogs.push({
          type,
          Comp
        });
        prevState.inits[type] = true;
      }
      return _setTypeTo(prevState, type, mdOption);
    }));
  }
};
const DialogContainer = () => {
  const [state, setState] = (0, _useStoreState.default)(() => ({
      isShow: false,
      inits: {},
      shows: {},
      data: {},
      dialogs: [],
      currentDialog: null
    }), _compStore.useMdOption, _onMdOption),
    {
      isShow,
      currentDialog,
      shows,
      data,
      dialogs
    } = state,
    _hClose = (0, _uiApi.useCallback)(type => {
      setState(prevState => {
        prevState.shows[type] = false;
        prevState.isShow = false;
        prevState.currentDialog = null;
        return {
          ...prevState
        };
      });
    }, [setState]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialogContainer.default, {
    isShow: isShow,
    onClose: (0, _uiApi.bindTo)(_hClose, currentDialog),
    children: dialogs.map(_ref => {
      let {
        type,
        Comp
      } = _ref;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
        isShow: shows[type],
        data: data[type],
        onClose: (0, _uiApi.bindTo)(_hClose, type)
      }, type);
    })
  });
};
var _default = exports.default = DialogContainer;
//# sourceMappingURL=DialogContainer.js.map