"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crDnDListHandlers = void 0;
var _watchListStore = require("../../../flux/watch-list/watchListStore");
var _uiApi = require("../../uiApi");
var _getTransferData = _interopRequireDefault(require("./getTransferData"));
var _WatchDnDConfig = _interopRequireDefault(require("./WatchDnDConfig"));
var _DnDStyleHandlers = require("./DnDStyleHandlers");
var _DnDHandlers = require("./DnDHandlers");
const _crListId = _ref => {
  let {
    groupCaption,
    caption
  } = _ref;
  return `${groupCaption};${caption};`;
};
const hDragStartList = (0, _DnDHandlers.fDragStart)([_WatchDnDConfig.default.LIST, _WatchDnDConfig.default.GROUP], _crListId);
const hDropList = (
//{groupCaption, caption},
options, evt) => {
  (0, _DnDStyleHandlers.dropWithDnDStyle)(evt);
  const {
      xType,
      dragId
    } = (0, _getTransferData.default)(evt),
    dropId = _crListId(options);
  if (xType === _WatchDnDConfig.default.LIST) {
    if (dragId === dropId) {
      return;
    } else {
      evt.preventDefault();
      (0, _watchListStore.ddList)({
        dragId,
        dropId
      });
    }
  } else if (xType === _WatchDnDConfig.default.ITEM) {
    evt.preventDefault();
    (0, _watchListStore.ddItem)({
      dragId,
      dropId
    });
  }
};
const hDragEnterList = (0, _DnDHandlers.fDragEnter)(_WatchDnDConfig.default.LIST, _WatchDnDConfig.default.C_LIST_ENTER);
const crDnDListHandlers = exports.crDnDListHandlers = (0, _uiApi.bindTo)(_DnDHandlers.crDnDHandlers, hDragStartList, hDropList, hDragEnterList, _DnDHandlers.hDragOver, _DnDHandlers.hDragLeave);
//# sourceMappingURL=DnDListHandlers.js.map