"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = require("../hooks/useToggle");
var _useProperty = require("../hooks/useProperty");
var _useMenuMore = _interopRequireDefault(require("../dialogs/hooks/useMenuMore"));
var _useToolbar = _interopRequireDefault(require("../dialogs/hooks/useToolbar"));
var _SearchAdapter = _interopRequireDefault(require("../../adapters/av-sm/SearchAdapter"));
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _jsxRuntime = require("react/jsx-runtime");
const ERR_DESCR = 'API key from Alpha Vantage is required',
  ERR_CAPTION = "Without API Key";
const AvSearchDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    caption,
    getKey,
    loadId,
    toTopLayer,
    onAbout,
    onError,
    onClose
  } = _ref;
  const [isToolbar, menuMoreModel] = (0, _useMenuMore.default)(onAbout),
    [isShowLabels, toggleLabels] = (0, _useToggle.useToggle)(true),
    _toolbarButtons = (0, _useToolbar.default)({
      toggleLabels,
      onAbout
    }),
    _searchApi = (0, _useProperty.useRefInit)(() => ({
      ..._SearchAdapter.default,
      onError,
      crUrlOptions: () => {
        const apiKey = getKey(loadId);
        if (!apiKey) {
          onError(ERR_DESCR, ERR_CAPTION);
          return;
        }
        return {
          apiKey
        };
      }
    }));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    caption: caption,
    menuModel: menuMoreModel,
    toTopLayer: toTopLayer,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: isToolbar,
      buttons: _toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSearch, {
      isShowLabels: isShowLabels,
      caption: "Token",
      searchApi: _searchApi
    })]
  });
});
var _default = exports.default = AvSearchDialog;
//# sourceMappingURL=AvSearchDialog.js.map