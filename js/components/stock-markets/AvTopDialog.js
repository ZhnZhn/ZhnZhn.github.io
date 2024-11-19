"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useMenuMore = _interopRequireDefault(require("../dialogs/hooks/useMenuMore"));
var _useToolbar = _interopRequireDefault(require("../dialogs/hooks/useToolbar"));
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _jsxRuntime = require("react/jsx-runtime");
const S_DIALOG = {
    width: 310
  },
  S_ROW_TEXT = {
    paddingRight: 16
  };
const AvTopDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    caption,
    toTopLayer,
    onAbout,
    loadId,
    onLoad,
    onShow,
    onClose
  } = _ref;
  const [isToolbar, menuMoreModel] = (0, _useMenuMore.default)(onAbout),
    _toolbarButtons = (0, _useToolbar.default)({
      onAbout
    })
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hLoad = (0, _uiApi.useCallback)(() => {
      onLoad({
        loadId,
        dfSubId: 'GL',
        dfFn: 'GL'
      });
    }, []);
  // onLoad, loadId
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    style: S_DIALOG,
    caption: caption,
    menuModel: menuMoreModel,
    toTopLayer: toTopLayer,
    onLoad: _hLoad,
    onShow: onShow,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: isToolbar,
      buttons: _toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowText, {
      style: S_ROW_TEXT,
      caption: "AV:",
      text: "Top Gainers & Losers"
    })]
  });
});
var _default = exports.default = AvTopDialog;
//# sourceMappingURL=AvTopDialog.js.map