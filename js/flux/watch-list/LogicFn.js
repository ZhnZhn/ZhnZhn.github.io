"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _MsgWatch = require("../../constants/MsgWatch");

var _arrFn = require("../../utils/arrFn");

var _imArrFn = require("../../utils/imArrFn");

var _factoryFindInPropArrayByProp = _interopRequireDefault(require("../../utils/factoryFindInPropArrayByProp"));

const CAPTION = 'caption',
      GROUPS = 'groups',
      LISTS = 'lists';
const LogicFn = {
  crMsgNotFound(itemType, name) {
    return {
      isDone: false,
      message: (0, _MsgWatch.notFoundItem)(itemType, name)
    };
  },

  crMsgGroupExisted(caption) {
    return {
      isDone: false,
      message: (0, _MsgWatch.groupExisted)(caption)
    };
  },

  crMsgListExisted(captionList, captionGroup) {
    return {
      isDone: false,
      message: (0, _MsgWatch.listExisted)(captionList, captionGroup)
    };
  },

  crMsgItemExisted(caption, captionList) {
    return {
      isDone: false,
      message: (0, _MsgWatch.itemExisted)(caption, captionList)
    };
  },

  /* for DragDrop */
  crAlertItemExisted(dropId, dragId) {
    return {
      isDone: false,
      alertItemId: dropId + ":" + dragId,
      ..._MsgWatch.ALERT_DND_ITEM
    };
  },

  crAlertListExisted(dropGroupCaption, dragListCaption) {
    return {
      isDone: false,
      alertItemId: dropGroupCaption + ":" + dragListCaption,
      ..._MsgWatch.ALERT_DND_LIST
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
  findIndex: (0, _arrFn.arrFactoryFindIndexByProp)('caption'),
  isInArraySameCaption: (0, _arrFn.arrFactoryIsSameByProp)(CAPTION)
};
var _default = LogicFn;
exports.default = _default;
//# sourceMappingURL=LogicFn.js.map