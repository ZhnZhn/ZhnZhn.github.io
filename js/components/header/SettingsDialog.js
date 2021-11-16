"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

var _has = _interopRequireDefault(require("../has"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _PaneApiKey = _interopRequireDefault(require("./PaneApiKey"));

var _PaneOptions = _interopRequireDefault(require("./PaneOptions"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
const S_MODAL = {
  position: 'static',
  width: 380,
  height: 446,
  margin: '70px auto 0px'
},
      S_MODAL_SMALL = {
  width: 295
},
      S_TITLE_API = {
  width: 82
},
      S_TITLE_OPTION = {
  width: 110
},
      S_BT = {
  color: '#232f3b'
};

const IS_WIDE_WIDTH = _has.default.wideWidth(),
      CL_ROW = 'row__pane-topic not-selected',
      _isFn = fn => typeof fn === 'function';

const useMenuMore = () => {
  const [isShowLabels, toggleLabels] = (0, _useToggle.default)(IS_WIDE_WIDTH)
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        menuModel = (0, _react.useMemo)(() => ({
    titleCl: CL_ROW,
    pageWidth: 190,
    maxPages: 1,
    p0: [{
      cn: CL_ROW,
      onClick: toggleLabels,
      name: "Toggle Input Labels",
      isClose: true
    }]
  }), []); //toggleLabels

  /*eslint-enable react-hooks/exhaustive-deps */

  return [isShowLabels, menuModel];
};

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
  }, []) // onClose

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        [isShowLabels, menuModel] = useMenuMore(),
        _style = isShowLabels ? S_MODAL : { ...S_MODAL,
    ...S_MODAL_SMALL
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ModalDialog, {
    ref: _refModalDialog,
    style: _style,
    caption: "User Settings",
    menuModel: menuModel,
    isWithButton: false,
    isShow: isShow,
    onClose: _hClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp.default.TabPane, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.Tab, {
        title: "ApiKeys",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaneApiKey.default, {
          isShow: isShow,
          isShowLabels: isShowLabels,
          titleStyle: S_TITLE_API,
          btStyle: S_BT,
          data: data,
          onClose: _hClose
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.Tab, {
        title: "Options",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaneOptions.default, {
          isShowLabels: isShowLabels,
          titleStyle: S_TITLE_OPTION,
          btStyle: S_BT,
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