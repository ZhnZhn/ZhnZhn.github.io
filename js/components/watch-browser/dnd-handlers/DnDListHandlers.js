"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.hDropList = exports.hDragStartList = exports.hDragOverList = exports.hDragLeaveList = exports.hDragEnterList = void 0;

var _WatchActions = require("../../../flux/actions/WatchActions");

var _getTransferData = _interopRequireDefault(require("./getTransferData"));

var _WatchDnDConfig = _interopRequireDefault(require("./WatchDnDConfig"));

var _DnDStyleHandlers = require("./DnDStyleHandlers");

var _DnDHandlers = require("./DnDHandlers");

const _crListId = _ref => {
  let {
    groupCaption,
    caption
  } = _ref;
  return groupCaption + ";" + caption + ";";
};

const hDragStartList = (0, _DnDHandlers.fDragStart)([_WatchDnDConfig.default.LIST, _WatchDnDConfig.default.GROUP], _crListId);
exports.hDragStartList = hDragStartList;

const hDropList = ( //{groupCaption, caption},
options, event) => {
  (0, _DnDStyleHandlers.dropWithDnDStyle)(event);

  const {
    xType,
    dragId
  } = (0, _getTransferData.default)(event),
        dropId = _crListId(options);

  if (xType === _WatchDnDConfig.default.LIST) {
    if (dragId === dropId) {
      return;
    } else {
      event.preventDefault();

      _WatchActions.WatchActions.dragDropList({
        dragId,
        dropId
      });
    }
  } else if (xType === _WatchDnDConfig.default.ITEM) {
    event.preventDefault();

    _WatchActions.WatchActions.dragDropItem({
      dragId,
      dropId
    });
  }
};

exports.hDropList = hDropList;
const hDragEnterList = (0, _DnDHandlers.fDragEnter)(_WatchDnDConfig.default.LIST, _WatchDnDConfig.default.C_LIST_ENTER);
exports.hDragEnterList = hDragEnterList;
const hDragOverList = _DnDHandlers.hDragOver;
exports.hDragOverList = hDragOverList;
const hDragLeaveList = _DnDHandlers.hDragLeave;
exports.hDragLeaveList = hDragLeaveList;
//# sourceMappingURL=DnDListHandlers.js.map