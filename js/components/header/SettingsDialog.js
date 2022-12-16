"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _crStyle = _interopRequireDefault(require("../zhn-utils/crStyle"));
var _ComponentActions = require("../../flux/actions/ComponentActions");
var _has = require("../has");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _TabPane = _interopRequireDefault(require("../zhn-tab/TabPane"));
var _Tab = _interopRequireDefault(require("../zhn-tab/Tab"));
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
const IS_WIDE_WIDTH = (0, _has.isWideWidth)(),
  CL_ROW = 'row__pane-topic not-selected',
  _isFn = fn => typeof fn === 'function';
const useMenuMore = () => {
  const [isShowLabels, toggleLabels] = (0, _useToggle.default)(IS_WIDE_WIDTH)
    /*eslint-disable react-hooks/exhaustive-deps */,
    menuModel = (0, _uiApi.useMemo)(() => ({
      titleCl: CL_ROW,
      pageWidth: 190,
      maxPages: 1,
      p0: [{
        cn: CL_ROW,
        onClick: toggleLabels,
        name: "Toggle Input Labels",
        isClose: true
      }]
    }), []);
  //toggleLabels
  /*eslint-enable react-hooks/exhaustive-deps */
  return [isShowLabels, menuModel];
};
const _focusPrevRefCompInstance = refCompInstance => {
  const _compInst = refCompInstance.current;
  if (_compInst && _isFn(_compInst.focusPrev)) {
    _compInst.focusPrev();
  }
};
const SettingsDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    data,
    onClose
  } = _ref;
  const _refModalDialog = (0, _uiApi.useRef)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hClose = (0, _uiApi.useCallback)(() => {
      onClose();
      _focusPrevRefCompInstance(_refModalDialog);
    }, [])
    // onClose
    /*eslint-enable react-hooks/exhaustive-deps */,
    [isShowLabels, menuModel] = useMenuMore(),
    _style = (0, _crStyle.default)(S_MODAL, !isShowLabels && S_MODAL_SMALL);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    ref: _refModalDialog,
    style: _style,
    caption: "User Settings",
    menuModel: menuModel,
    isWithButton: false,
    isShow: isShow,
    onClose: _hClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane.default, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "ApiKeys",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaneApiKey.default, {
          isShow: isShow,
          isShowLabels: isShowLabels,
          titleStyle: S_TITLE_API,
          btStyle: S_BT,
          data: data,
          onClose: _hClose
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Options",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaneOptions.default, {
          isShowLabels: isShowLabels,
          titleStyle: S_TITLE_OPTION,
          btStyle: S_BT,
          data: data,
          onChangeTheme: _ComponentActions.ComponentActions.changeTheme,
          onClose: _hClose
        })
      })]
    })
  });
});

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