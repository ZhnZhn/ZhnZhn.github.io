"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _MsgWatch = _interopRequireDefault(require("../../constants/MsgWatch"));

var _fnUtil = _interopRequireDefault(require("../../utils/fnUtil"));

var _imArrFn = require("../../utils/imArrFn");

var _factoryFindInPropArrayByProp = _interopRequireDefault(require("../../utils/factoryFindInPropArrayByProp"));

const {
  notFoundItem,
  groupExisted,
  listExisted,
  itemExisted,
  ALERT_DND_LIST,
  ALERT_DND_ITEM
} = _MsgWatch.default;
const CAPTION = 'caption',
      GROUPS = 'groups',
      LISTS = 'lists';
const LogicFn = {
  crMsgNotFound(itemType, name) {
    return {
      isDone: false,
      message: notFoundItem(itemType, name)
    };
  },

  crMsgGroupExisted(caption) {
    return {
      isDone: false,
      message: groupExisted(caption)
    };
  },

  crMsgListExisted(captionList, captionGroup) {
    return {
      isDone: false,
      message: listExisted(captionList, captionGroup)
    };
  },

  crMsgItemExisted(caption, captionList) {
    return {
      isDone: false,
      message: itemExisted(caption, captionList)
    };
  },

  /* for DragDrop */
  crAlertItemExisted(dropId, dragId) {
    return {
      isDone: false,
      alertItemId: dropId + ":" + dragId,
      ...ALERT_DND_ITEM
    };
  },

  crAlertListExisted(dropGroupCaption, dragListCaption) {
    return {
      isDone: false,
      alertItemId: dropGroupCaption + ":" + dragListCaption,
      ...ALERT_DND_LIST
    };
  },

  /* for DragDrop */
  filter: (0, _imArrFn.imArrFactoryFilterByProp)(CAPTION),
  getArrayWithObj: _imArrFn.imArrPush,
  getArrayWithRename: (0, _imArrFn.imArrFactoryEditByProp)(CAPTION),

  /* for DragDrop */
  insertItemInArray: _imArrFn.imArrInsertItem,

  /* for DragDrop */
  findGroup: (0, _factoryFindInPropArrayByProp.default)(GROUPS, CAPTION),
  findList: (0, _factoryFindInPropArrayByProp.default)(LISTS, CAPTION),
  findIndex: _fnUtil.default.arr.findIndexByProp('caption'),
  isInArraySameCaption: _fnUtil.default.arr.isSameByProp(CAPTION)
};
var _default = LogicFn;
exports.default = _default;
//# sourceMappingURL=LogicFn.js.map