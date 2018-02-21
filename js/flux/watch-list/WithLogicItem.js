'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LogicFn = require('./LogicFn');

var _LogicFn2 = _interopRequireDefault(_LogicFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crMsgItemExisted = _LogicFn2.default.crMsgItemExisted,
    findGroup = _LogicFn2.default.findGroup,
    findList = _LogicFn2.default.findList,
    isInArraySameCaption = _LogicFn2.default.isInArraySameCaption,
    filter = _LogicFn2.default.filter;


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
        title: title, subtitle: subtitle, caption: caption, columnName: columnName, dataColumn: dataColumn, id: id, fromDate: fromDate, seriaColumnNames: seriaColumnNames
      });
    } else {
      toList.items = [{
        title: title, subtitle: subtitle, caption: caption, columnName: columnName, dataColumn: dataColumn, id: id, fromDate: fromDate, seriaColumnNames: seriaColumnNames
      }];
    }
    return { isDone: true };
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

exports.default = WithLogicItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\watch-list\WithLogicItem.js.map