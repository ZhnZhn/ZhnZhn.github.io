"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _PaneApiKey = _interopRequireDefault(require("./PaneApiKey"));

var _PaneOptions = _interopRequireDefault(require("./PaneOptions"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
const S = {
  MODAL: {
    position: 'static',
    width: 380,
    height: 446,
    margin: '70px auto 0px'
  },
  TITLE_API: {
    width: 80
  },
  TITLE_OPTION: {
    width: 110
  },
  BT: {
    color: '#232f3b'
  }
};

const _isFn = fn => typeof fn === 'function';

const _isNotShouldRerender = (prevProps, nextProps) => prevProps.isShow === nextProps.isShow;

const SettingsDialog = /*#__PURE__*/(0, _react.memo)(({
  isShow,
  data,
  onClose
}) => {
  const _refModalDialog = (0, _react.useRef)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hClose = (0, _react.useCallback)(() => {
    onClose();
    const _compDialog = _refModalDialog.current;

    if (_compDialog && _isFn(_compDialog.focusPrev)) {
      _compDialog.focusPrev();
    }
  }, []); // onClose

  /*eslint-enable react-hooks/exhaustive-deps */


  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ModalDialog, {
    ref: _refModalDialog,
    caption: "User Settings",
    style: S.MODAL,
    isWithButton: false,
    isShow: isShow,
    onClose: _hClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp.default.TabPane, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.Tab, {
        title: "ApiKeys",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaneApiKey.default, {
          isShow: isShow,
          titleStyle: S.TITLE_API,
          btStyle: S.BT,
          data: data,
          onClose: _hClose
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.Tab, {
        title: "Options",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaneOptions.default, {
          titleStyle: S.TITLE_OPTION,
          btStyle: S.BT,
          data: data,
          onChangeTheme: _ComponentActions.default.changeTheme,
          onClose: _hClose
        })
      })]
    })
  });
}, _isNotShouldRerender);
/*
SettingsDialog.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    setQuandlKey: PropTypes.func,
    isAdminMode: PropTypes.func,
    isDrawDeltaExtrems: PropTypes.func
  }),
  onClose: PropTypes.func
}
*/

var _default = SettingsDialog;
exports.default = _default;
//# sourceMappingURL=SettingsDialog.js.map