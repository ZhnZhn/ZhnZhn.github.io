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
        title = zhConfig.title,
        subtitle = zhConfig.subtitle,
        columnName = zhConfig.columnName,
        dataColumn = zhConfig.dataColumn,
        id = zhConfig.id,
        fromDate = zhConfig.fromDate,
        seriaColumnNames = zhConfig.seriaColumnNames,
        toGroup = findGroup(watchList, groupCaption),
        toList = findList(toGroup, listCaption),
        items = toList.items;

    if (isInArraySameCaption(items, caption)) {
      return crMsgItemExisted(caption, listCaption);
    }

    if (items) {
      toList.items.push({
        title: title,
        subtitle: subtitle,
        caption: caption,
        columnName: columnName,
        dataColumn: dataColumn,
        id: id,
        fromDate: fromDate,
        seriaColumnNames: seriaColumnNames
      });
    } else {
      toList.items = [{
        title: title,
        subtitle: subtitle,
        caption: caption,
        columnName: columnName,
        dataColumn: dataColumn,
        id: id,
        fromDate: fromDate,
        seriaColumnNames: seriaColumnNames
      }];
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