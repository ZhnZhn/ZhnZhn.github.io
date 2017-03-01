'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LogicFn = require('./LogicFn');

var _LogicFn2 = _interopRequireDefault(_LogicFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        toGroup = _LogicFn2.default.findGroup(watchList, groupCaption),
        toList = _LogicFn2.default.findList(toGroup, listCaption),
        items = toList.items;

    if (_LogicFn2.default.checkIsInArraySameCaption(items, caption)) {
      return _LogicFn2.default.fResultItemExisted(caption, listCaption);
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

    var groupFrom = _LogicFn2.default.findGroup(watchList, groupCaption),
        listFrom = _LogicFn2.default.findList(groupFrom, listCaption);

    listFrom.items = _LogicFn2.default.filter(listFrom.items, caption);
  }
};

exports.default = WithLogicItem;
//# sourceMappingURL=WithLogicItem.js.map