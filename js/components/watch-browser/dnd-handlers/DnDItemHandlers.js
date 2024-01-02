"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crDnDItemHandlers = void 0;
var _watchListStore = require("../../../flux/watch-list/watchListStore");
var _uiApi = require("../../uiApi");
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
const hDragStartItem = (0, _DnDHandlers.fDragStart)([_WatchDnDConfig.default.ITEM, _WatchDnDConfig.default.LIST], _crItemId);
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
const hDragEnterItem = (0, _DnDHandlers.fDragEnter)(_WatchDnDConfig.default.ITEM, _WatchDnDConfig.default.C_LIST_ENTER);
const crDnDItemHandlers = exports.crDnDItemHandlers = (0, _uiApi.bindTo)(_DnDHandlers.crDnDHandlers, hDragStartItem, hDropItem, hDragEnterItem, _DnDHandlers.hDragOver, _DnDHandlers.hDragLeave);
//# sourceMappingURL=DnDItemHandlers.js.map