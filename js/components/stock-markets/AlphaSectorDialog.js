"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _useMenuMore = _interopRequireDefault(require("../dialogs/hooks/useMenuMore"));

var _useCommandButtons = _interopRequireDefault(require("../dialogs/hooks/useCommandButtons"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

const S_DIALOG = {
  width: 300
},
      S_ROW_TEXT = {
  paddingRight: 16
};
const AlphaSectorDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    caption,
    loadId,
    dfSubId,
    onLoad,
    onShow,
    onFront,
    onClose,
    onClickInfo
  } = _ref;

  const [isToolbar, menuMoreModel] = (0, _useMenuMore.default)(onClickInfo),
        _refToolbarButtons = (0, _uiApi.useRef)([{
    caption: 'A',
    title: 'About Datasouce',
    onClick: onClickInfo
  }])
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hLoad = (0, _uiApi.useCallback)(() => {
    onLoad({
      loadId,
      dfSubId,
      indicator: 'SECTOR'
    });
  }, []) // onLoad, loadId, dfSubId

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _commandButtons = (0, _useCommandButtons.default)(_hLoad);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    style: S_DIALOG,
    caption: caption,
    menuModel: menuMoreModel,
    commandButtons: _commandButtons,
    onShowChart: onShow,
    onFront: onFront,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: isToolbar,
      buttons: (0, _uiApi.getRefValue)(_refToolbarButtons)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Row.Text, {
      styleRoot: S_ROW_TEXT,
      caption: "AV:",
      text: "Sector Performances"
    })]
  });
});
var _default = AlphaSectorDialog;
exports.default = _default;
//# sourceMappingURL=AlphaSectorDialog.js.map