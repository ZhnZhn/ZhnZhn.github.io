"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
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
const DialogContainer = () => {
  const [state, setState] = (0, _uiApi.useState)({
      isShow: false,
      inits: {},
      shows: {},
      data: {},
      dialogs: [],
      currentDialog: null
    }),
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
    }, []);
  (0, _compStore.useMdOption)(mdOption => {
    if (mdOption) {
      const type = mdOption.modalDialogType,
        {
          inits
        } = state;
      (0, _RouterModalDialog.getModalDialog)(inits[type] ? void 0 : type).then(comp => setState(prevState => {
        if (comp) {
          prevState.dialogs.push({
            type,
            comp
          });
          prevState.inits[type] = true;
        }
        return _setTypeTo(prevState, type, mdOption);
      }));
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialogContainer.default, {
    isShow: isShow,
    onClose: (0, _uiApi.bindTo)(_hClose, currentDialog),
    children: dialogs.map(_ref => {
      let {
        type,
        comp
      } = _ref;
      return (0, _uiApi.createElement)(comp, {
        key: type,
        isShow: shows[type],
        data: data[type],
        onClose: (0, _uiApi.bindTo)(_hClose, type)
      });
    })
  });
};
var _default = exports.default = DialogContainer;
//# sourceMappingURL=DialogContainer.js.map