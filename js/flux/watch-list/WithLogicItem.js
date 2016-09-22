'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LogicFn = require('./LogicFn');

var _LogicFn2 = _interopRequireDefault(_LogicFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WithLogicItem = {
  addItem: function addItem(watchList, item) {
    var caption = item.caption;
    var groupCaption = item.groupCaption;
    var listCaption = item.listCaption;
    var config = item.config;
    var zhConfig = config.zhConfig;
    var title = zhConfig.title;
    var subtitle = zhConfig.subtitle;
    var columnName = zhConfig.columnName;
    var dataColumn = zhConfig.dataColumn;
    var id = zhConfig.id;
    var fromDate = zhConfig.fromDate;
    var seriaColumnNames = zhConfig.seriaColumnNames;
    var toGroup = _LogicFn2.default.findGroup(watchList, groupCaption);
    var toList = _LogicFn2.default.findList(toGroup, listCaption);
    var items = toList.items;

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
    var groupCaption = _ref.groupCaption;
    var listCaption = _ref.listCaption;
    var caption = _ref.caption;

    var groupFrom = _LogicFn2.default.findGroup(watchList, groupCaption),
        listFrom = _LogicFn2.default.findList(groupFrom, listCaption);

    listFrom.items = _LogicFn2.default.filter(listFrom.items, caption);
  }
};

exports.default = WithLogicItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\watch-list\WithLogicItem.js.map