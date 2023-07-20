"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useListen = _interopRequireDefault(require("../hooks/useListen"));
var _ComponentActions = require("../../flux/actions/ComponentActions");
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
const _renderDialogs = (store, _ref, _handleClose) => {
  let {
    shows,
    data,
    dialogs
  } = _ref;
  return dialogs.map(_ref2 => {
    let {
      type,
      comp
    } = _ref2;
    return (0, _uiApi.createElement)(comp, {
      key: type,
      isShow: shows[type],
      data: data[type],
      store: store,
      onClose: _handleClose.bind(null, type)
    });
  });
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
      currentDialog
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
    }, []),
    store = (0, _useListen.default)((actionType, option) => {
      if (actionType === _ComponentActions.CAT_SHOW_MODAL_DIALOG) {
        const type = option.modalDialogType,
          {
            inits
          } = state;
        if (inits[type]) {
          Promise.resolve().then(_ => {
            setState(prevState => _setTypeTo(prevState, type, option));
          });
        } else {
          (0, _RouterModalDialog.getModalDialog)(type).then(comp => setState(prevState => {
            prevState.dialogs.push({
              type,
              comp
            });
            prevState.inits[type] = true;
            return _setTypeTo(prevState, type, option);
          }));
        }
      }
    });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialogContainer.default, {
    isShow: isShow,
    onClose: _hClose.bind(null, currentDialog),
    children: _renderDialogs(store, state, _hClose)
  });
};
var _default = DialogContainer;
exports.default = _default;
//# sourceMappingURL=DialogContainer.js.map