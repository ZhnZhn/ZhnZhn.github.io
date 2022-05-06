"use strict";

exports.__esModule = true;
exports.default = void 0;

var _LogicFn = require("./LogicFn");

const WithLogicGroup = {
  addGroup(watchList, _ref) {
    let {
      caption
    } = _ref;
    const groups = watchList.groups;

    if ((0, _LogicFn.isInArraySameCaption)(groups, caption)) {
      return (0, _LogicFn.crMsgGroupExisted)(caption);
    }

    const _captionObj = caption ? {
      caption
    } : {
      caption: "Default"
    };

    watchList.groups = (0, _LogicFn.getArrayWithObj)(groups, _captionObj);
    return {
      isDone: true
    };
  },

  renameGroup(watchList, _ref2) {
    let {
      captionFrom,
      captionTo
    } = _ref2;
    const groups = watchList.groups,
          groupIndex = (0, _LogicFn.findIndex)(groups, captionFrom);

    if (groupIndex === -1) {
      return (0, _LogicFn.crMsgNotFound)('group', captionFrom);
    }

    if ((0, _LogicFn.isInArraySameCaption)(groups, captionTo)) {
      return (0, _LogicFn.crMsgGroupExisted)(captionTo);
    }

    watchList.groups = (0, _LogicFn.getArrayWithRename)(groups, groupIndex, captionTo);
    return {
      isDone: true
    };
  },

  deleteGroup(watchList, _ref3) {
    let {
      caption
    } = _ref3;
    watchList.groups = (0, _LogicFn.filter)(watchList.groups, caption);
    return {
      isDone: true
    };
  }

};
var _default = WithLogicGroup;
exports.default = _default;
//# sourceMappingURL=WithLogicGroup.js.map