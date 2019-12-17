"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _LogicFn = _interopRequireDefault(require("./LogicFn"));

var crMsgGroupExisted = _LogicFn["default"].crMsgGroupExisted,
    crMsgNotFound = _LogicFn["default"].crMsgNotFound,
    isInArraySameCaption = _LogicFn["default"].isInArraySameCaption,
    getArrayWithObj = _LogicFn["default"].getArrayWithObj,
    findIndex = _LogicFn["default"].findIndex,
    getArrayWithRename = _LogicFn["default"].getArrayWithRename,
    filter = _LogicFn["default"].filter;
var WithLogicGroup = {
  addGroup: function addGroup(watchList, _ref) {
    var caption = _ref.caption;
    var groups = watchList.groups;

    if (isInArraySameCaption(groups, caption)) {
      return crMsgGroupExisted(caption);
    }

    var _captionObj = caption ? {
      caption: caption
    } : {
      caption: "Default"
    };

    watchList.groups = getArrayWithObj(groups, _captionObj);
    return {
      isDone: true
    };
  },
  renameGroup: function renameGroup(watchList, _ref2) {
    var captionFrom = _ref2.captionFrom,
        captionTo = _ref2.captionTo;
    var groups = watchList.groups,
        groupIndex = findIndex(groups, captionFrom);

    if (groupIndex === -1) {
      return crMsgNotFound('group', captionFrom);
    }

    if (isInArraySameCaption(groups, captionTo)) {
      return crMsgGroupExisted(captionTo);
    }

    watchList.groups = getArrayWithRename(groups, groupIndex, captionTo);
    return {
      isDone: true
    };
  },
  deleteGroup: function deleteGroup(watchList, _ref3) {
    var caption = _ref3.caption;
    watchList.groups = filter(watchList.groups, caption);
    return {
      isDone: true
    };
  }
};
var _default = WithLogicGroup;
exports["default"] = _default;
//# sourceMappingURL=WithLogicGroup.js.map