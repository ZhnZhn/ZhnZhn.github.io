"use strict";

exports.__esModule = true;
exports.default = void 0;

var _LogicFn = require("./LogicFn");

const WithLogicList = {
  createList(watchList, _ref) {
    let {
      captionGroup,
      captionList
    } = _ref;
    const groupTo = (0, _LogicFn.findGroup)(watchList, captionGroup);

    if (!groupTo) {
      return (0, _LogicFn.crMsgNotFound)('group', captionGroup);
    }

    const lists = groupTo.lists;

    if ((0, _LogicFn.isInArraySameCaption)(lists, captionList)) {
      return (0, _LogicFn.crMsgListExisted)(captionList, captionGroup);
    }

    groupTo.lists = (0, _LogicFn.getArrayWithObj)(lists, {
      caption: captionList
    });
    return {
      isDone: true
    };
  },

  renameList(watchList, _ref2) {
    let {
      captionGroup,
      captionListFrom,
      captionListTo
    } = _ref2;
    const groupIn = (0, _LogicFn.findGroup)(watchList, captionGroup);

    if (!groupIn) {
      return (0, _LogicFn.crMsgNotFound)('group', captionGroup);
    }

    const lists = groupIn.lists;
    const listIndex = (0, _LogicFn.findIndex)(lists, captionListFrom);

    if (listIndex === -1) {
      return (0, _LogicFn.crMsgNotFound)('list', captionListFrom);
    }

    if ((0, _LogicFn.isInArraySameCaption)(lists, captionListTo)) {
      return (0, _LogicFn.crMsgListExisted)(captionListTo, captionGroup);
    }

    groupIn.lists = (0, _LogicFn.getArrayWithRename)(lists, listIndex, captionListTo);
    return {
      isDone: true
    };
  },

  deleteList(watchList, _ref3) {
    let {
      captionGroup,
      captionList
    } = _ref3;
    const groupFrom = (0, _LogicFn.findGroup)(watchList, captionGroup);

    if (!groupFrom) {
      return (0, _LogicFn.crMsgNotFound)('group', captionGroup);
    }

    groupFrom.lists = (0, _LogicFn.filter)(groupFrom.lists, captionList);
    return {
      isDone: true
    };
  }

};
var _default = WithLogicList;
exports.default = _default;
//# sourceMappingURL=WithLogicList.js.map