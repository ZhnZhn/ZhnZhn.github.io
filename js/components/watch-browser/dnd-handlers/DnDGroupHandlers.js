"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.hDropGroup = exports.hDragStartGroup = exports.hDragOverGroup = exports.hDragLeaveGroup = exports.hDragEnterGroup = void 0;

var _getTransferData = _interopRequireDefault(require("./getTransferData"));

var _WatchActions = require("../../../flux/actions/WatchActions");

var _WatchDnDConfig = _interopRequireDefault(require("../WatchDnDConfig"));

var _DnDStyleHandlers = require("./DnDStyleHandlers");

var _DnDHandlers = require("./DnDHandlers");

const _crGroupId = _ref => {
  let {
    caption
  } = _ref;
  return caption + ";";
};

const hDragStartGroup = (0, _DnDHandlers.fDragStart)([_WatchDnDConfig.default.GROUP], _crGroupId);
exports.hDragStartGroup = hDragStartGroup;

const hDropGroup = ( //{ caption },
options, event) => {
  (0, _DnDStyleHandlers.dropWithDnDStyle)(event);

  const {
    xType,
    dragId
  } = (0, _getTransferData.default)(event),
        dropId = _crGroupId(options);

  if (xType === _WatchDnDConfig.default.GROUP) {
    if (dragId === dropId) {
      return;
    } else {
      event.preventDefault();

      _WatchActions.WatchActions.dragDropGroup({
        dragId,
        dropId
      });
    }
  } else if (xType === _WatchDnDConfig.default.LIST) {
    event.preventDefault();

    _WatchActions.WatchActions.dragDropList({
      dragId,
      dropId
    });
  }
};

exports.hDropGroup = hDropGroup;
const hDragEnterGroup = (0, _DnDHandlers.fDragEnter)(_WatchDnDConfig.default.GROUP, _WatchDnDConfig.default.C_GROUP_ENTER);
exports.hDragEnterGroup = hDragEnterGroup;
const hDragOverGroup = _DnDHandlers.hDragOver;
exports.hDragOverGroup = hDragOverGroup;
const hDragLeaveGroup = _DnDHandlers.hDragLeave;
exports.hDragLeaveGroup = hDragLeaveGroup;
//# sourceMappingURL=DnDGroupHandlers.js.map