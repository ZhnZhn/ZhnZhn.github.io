"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.hDropItem = exports.hDragStartItem = exports.hDragOverItem = exports.hDragLeaveItem = exports.hDragEnterItem = void 0;
var _watchListStore = require("../../../flux/watch-list/watchListStore");
var _getTransferData = _interopRequireDefault(require("./getTransferData"));
var _WatchDnDConfig = _interopRequireDefault(require("./WatchDnDConfig"));
var _DnDStyleHandlers = require("./DnDStyleHandlers");
var _DnDHandlers = require("./DnDHandlers");
const _crItemId = _ref => {
  let {
    groupCaption,
    listCaption,
    caption
  } = _ref;
  return `${groupCaption};${listCaption};${caption}`;
};
const hDragStartItem = exports.hDragStartItem = (0, _DnDHandlers.fDragStart)([_WatchDnDConfig.default.ITEM, _WatchDnDConfig.default.LIST], _crItemId);
const hDropItem = (
//{groupCaption, listCaption, caption},
options, evt) => {
  (0, _DnDStyleHandlers.dropWithDnDStyle)(evt);
  const {
      xType,
      dragId
    } = (0, _getTransferData.default)(evt),
    dropId = _crItemId(options);
  if (xType === _WatchDnDConfig.default.ITEM) {
    if (dragId === dropId) {
      return;
    } else {
      evt.preventDefault();
      (0, _watchListStore.ddItem)({
        dragId,
        dropId
      });
    }
  }
};
exports.hDropItem = hDropItem;
const hDragEnterItem = exports.hDragEnterItem = (0, _DnDHandlers.fDragEnter)(_WatchDnDConfig.default.ITEM, _WatchDnDConfig.default.C_LIST_ENTER);
const hDragOverItem = exports.hDragOverItem = _DnDHandlers.hDragOver;
const hDragLeaveItem = exports.hDragLeaveItem = _DnDHandlers.hDragLeave;
//# sourceMappingURL=DnDItemHandlers.js.map