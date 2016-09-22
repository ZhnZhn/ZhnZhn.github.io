'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LogicFn = require('./LogicFn');

var _LogicFn2 = _interopRequireDefault(_LogicFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WithLogicGroup = {
  addGroup: function addGroup(watchList, _ref) {
    var caption = _ref.caption;

    var groups = watchList.groups;

    if (_LogicFn2.default.checkIsInArraySameCaption(groups, caption)) {
      return _LogicFn2.default.fResultGroupExisted(caption);
    }

    var _captionObj = caption ? { caption: caption } : { caption: "Default" };

    watchList.groups = _LogicFn2.default.getArrayWithObj(groups, _captionObj);
    return { isDone: true };
  },
  renameGroup: function renameGroup(watchList, _ref2) {
    var captionFrom = _ref2.captionFrom;
    var captionTo = _ref2.captionTo;

    var groups = watchList.groups,
        groupIndex = _LogicFn2.default.findIndex(groups, captionFrom);

    if (groupIndex === -1) {
      return _LogicFn2.default.fResultNotFound('group', captionFrom);
    }
    if (_LogicFn2.default.checkIsInArraySameCaption(groups, captionTo)) {
      return _LogicFn2.default.fResultGroupExisted(captionTo);
    }

    watchList.groups = _LogicFn2.default.getArrayWithRename(groups, groupIndex, captionTo);
    return { isDone: true };
  },
  deleteGroup: function deleteGroup(watchList, _ref3) {
    var caption = _ref3.caption;

    watchList.groups = _LogicFn2.default.filter(watchList.groups, caption);
    return { isDone: true };
  }
};

exports.default = WithLogicGroup;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\watch-list\WithLogicGroup.js.map