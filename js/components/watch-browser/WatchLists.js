"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _Color = require("../styles/Color");
var _DnDListHandlers = require("./dnd-handlers/DnDListHandlers");
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _WatchItems = _interopRequireDefault(require("./WatchItems"));
var _jsxRuntime = require("react/jsx-runtime");
const WatchLists = _ref => {
  let {
    isModeEdit,
    groupCaption,
    lists
  } = _ref;
  return (0, _uiApi.safeMap)(lists, _ref2 => {
    let {
      caption,
      items
    } = _ref2;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
      role: "menuitem",
      style: _styleFn.S_OPEN_CLOSE_LEVEL_2,
      openColor: _Color.GREEN_COLOR,
      caption: caption,
      dndHandlers: (0, _DnDListHandlers.crDnDListHandlers)(isModeEdit, {
        groupCaption,
        caption
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WatchItems.default, {
        isModeEdit: isModeEdit,
        items: items,
        groupCaption: groupCaption,
        listCaption: caption
      })
    }, caption);
  });
};
var _default = exports.default = WatchLists;
//# sourceMappingURL=WatchLists.js.map