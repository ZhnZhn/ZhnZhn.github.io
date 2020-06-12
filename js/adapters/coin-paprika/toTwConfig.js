"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getValue = _fnAdapter["default"].getValue;

var _crItems = function _crItems(json) {
  var items = [];
  var i;

  for (i = 0; i < json.length; i++) {
    var _json$i = json[i],
        user_name = _json$i.user_name,
        date = _json$i.date,
        status_id = _json$i.status_id,
        status_link = _json$i.status_link,
        status = _json$i.status,
        retweet_count = _json$i.retweet_count,
        like_count = _json$i.like_count;

    if (date && status_id) {
      items.push({
        id: status_id,
        user: '@' + user_name,
        link: status_link,
        date: date.replace('T', ' ').replace('Z', ''),
        text: status,
        retweet: retweet_count,
        like: like_count
      });
    }
  }

  return items;
};

var toTwConfig = {
  crKey: function crKey(option) {
    var _option$items = option.items,
        items = _option$items === void 0 ? [] : _option$items;
    return option._itemKey = getValue(items[0]);
  },
  toConfig: function toConfig(json, option) {
    var _itemKey = option._itemKey,
        title = option.title,
        config = {
      id: _itemKey,
      title: title,
      items: _crItems(json),
      zhCompType: 'TW_LIST',
      zhConfig: {
        id: _itemKey,
        key: _itemKey
      }
    };
    return {
      config: config
    };
  }
};
var _default = toTwConfig;
exports["default"] = _default;
//# sourceMappingURL=toTwConfig.js.map