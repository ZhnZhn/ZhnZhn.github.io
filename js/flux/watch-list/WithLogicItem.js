"use strict";

exports.__esModule = true;
exports.default = void 0;

var _LogicFn = require("./LogicFn");

const WithLogicItem = {
  addItem(watchList, item) {
    const {
      caption,
      groupCaption,
      listCaption,
      config
    } = item,
          {
      zhConfig
    } = config,
          {
      id,
      title,
      subtitle,
      itemConf = {}
    } = zhConfig,
          toGroup = (0, _LogicFn.findGroup)(watchList, groupCaption),
          toList = (0, _LogicFn.findList)(toGroup, listCaption);

    if ((0, _LogicFn.isInArraySameCaption)(toList.items, caption)) {
      return (0, _LogicFn.crMsgItemExisted)(caption, listCaption);
    }

    const _item = {
      id,
      title,
      subtitle,
      caption,
      itemConf
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

  removeItem(watchList, _ref) {
    let {
      groupCaption,
      listCaption,
      caption
    } = _ref;
    const groupFrom = (0, _LogicFn.findGroup)(watchList, groupCaption),
          listFrom = (0, _LogicFn.findList)(groupFrom, listCaption);
    listFrom.items = (0, _LogicFn.filter)(listFrom.items, caption);
  }

};
var _default = WithLogicItem;
exports.default = _default;
//# sourceMappingURL=WithLogicItem.js.map