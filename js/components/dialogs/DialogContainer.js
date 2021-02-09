"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _ModalDialogContainer = _interopRequireDefault(require("../zhn-containers/ModalDialogContainer"));

var _ComponentActions = require("../../flux/actions/ComponentActions");

var _RouterModalDialog = _interopRequireDefault(require("./RouterModalDialog"));

//import PropTypes from "prop-types";
var _setTypeTo = function _setTypeTo(prevState, type, option) {
  prevState.shows[type] = true;
  prevState.data[type] = option;
  prevState.isShow = true;
  prevState.currentDialog = type;
  return (0, _extends2["default"])({}, prevState);
};

var _renderDialogs = function _renderDialogs(store, _ref, _handleClose) {
  var shows = _ref.shows,
      data = _ref.data,
      dialogs = _ref.dialogs;
  return dialogs.map(function (_ref2) {
    var type = _ref2.type,
        comp = _ref2.comp;
    return /*#__PURE__*/(0, _react.createElement)(comp, {
      key: type,
      isShow: shows[type],
      data: data[type],
      store: store,
      onClose: _handleClose.bind(null, type)
    });
  });
};

var DialogContainer = function DialogContainer(_ref3) {
  var store = _ref3.store;

  var _useState = (0, _react.useState)({
    isShow: false,
    inits: {},
    shows: {},
    data: {},
    dialogs: [],
    currentDialog: null
  }),
      state = _useState[0],
      setState = _useState[1],
      _hClose = (0, _react.useCallback)(function (type) {
    setState(function (prevState) {
      prevState.shows[type] = false;
      prevState.isShow = false;
      prevState.currentDialog = null;
      return (0, _extends2["default"])({}, prevState);
    });
  }, []);

  (0, _useListen["default"])(store, function (actionType, option) {
    if (actionType === _ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG) {
      var type = option.modalDialogType,
          inits = state.inits;

      if (inits[type]) {
        Promise.resolve().then(function (_) {
          setState(function (prevState) {
            return _setTypeTo(prevState, type, option);
          });
        });
      } else {
        _RouterModalDialog["default"].getDialog(type).then(function (comp) {
          return setState(function (prevState) {
            prevState.dialogs.push({
              type: type,
              comp: comp
            });
            prevState.inits[type] = true;
            return _setTypeTo(prevState, type, option);
          });
        });
      }
    }
  });
  var isShow = state.isShow,
      currentDialog = state.currentDialog;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialogContainer["default"], {
    isShow: isShow,
    onClose: _hClose.bind(null, currentDialog),
    children: _renderDialogs(store, state, _hClose)
  });
};
/*
DialogContainer.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func
  })
}
*/


var _default = DialogContainer;
exports["default"] = _default;
//# sourceMappingURL=DialogContainer.js.map