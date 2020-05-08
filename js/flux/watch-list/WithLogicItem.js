"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _LogicFn = _interopRequireDefault(require("./LogicFn"));

var crMsgItemExisted = _LogicFn["default"].crMsgItemExisted,
    findGroup = _LogicFn["default"].findGroup,
    findList = _LogicFn["default"].findList,
    isInArraySameCaption = _LogicFn["default"].isInArraySameCaption,
    filter = _LogicFn["default"].filter;
var WithLogicItem = {
  addItem: function addItem(watchList, item) {
    var caption = item.caption,
        groupCaption = item.groupCaption,
        listCaption = item.listCaption,
        config = item.config,
        zhConfig = config.zhConfig,
        id = zhConfig.id,
        title = zhConfig.title,
        subtitle = zhConfig.subtitle,
        _zhConfig$itemConf = zhConfig.itemConf,
        itemConf = _zhConfig$itemConf === void 0 ? {} : _zhConfig$itemConf,
        toGroup = findGroup(watchList, groupCaption),
        toList = findList(toGroup, listCaption);

    if (isInArraySameCaption(toList.items, caption)) {
      return crMsgItemExisted(caption, listCaption);
    }

    var _item = {
      id: id,
      title: title,
      subtitle: subtitle,
      caption: caption,
      itemConf: itemConf
    };

    if (toList.items) {
      toList.items.push(_item);
    } else {
      toList.items = [_item];
    }

    return {
      isDone: true
    };
  },
  removeItem: function removeItem(watchList, _ref) {
    var groupCaption = _ref.groupCaption,
        listCaption = _ref.listCaption,
        caption = _ref.caption;
    var groupFrom = findGroup(watchList, groupCaption),
        listFrom = findList(groupFrom, listCaption);
    listFrom.items = filter(listFrom.items, caption);
  }
};
var _default = WithLogicItem;
exports["default"] = _default;
//# sourceMappingURL=WithLogicItem.js.map